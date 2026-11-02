import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import {
    LogOut,
    RefreshCw,
    Mail,
    CheckCircle,
    Clock,
    Star,
    Save,
    Code2
} from 'lucide-react'

import { supabase } from '../services/supabase.js'
import { useAuth } from '../hooks/useAuth.js'
import { getRepositories } from '../services/github.js'

export default function Dashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [messages, setMessages] = useState([])
    const [repositories, setRepositories] = useState([])
    const [featuredNames, setFeaturedNames] = useState([])

    const [loading, setLoading] = useState(true)
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [savingProjects, setSavingProjects] = useState(false)
    const [updatingId, setUpdatingId] = useState(null)

    const [error, setError] = useState('')
    const [projectError, setProjectError] = useState('')
    const [projectNotice, setProjectNotice] = useState('')

    // Buscar mensagens no Supabase
    const fetchMessages = useCallback(async () => {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            throw error
        }

        return data || []
    }, [])

    // Carregar mensagens ao abrir o Dashboard
    useEffect(() => {
        let active = true

        async function loadInitialMessages() {
            try {
                const data = await fetchMessages()

                if (active) {
                    setMessages(data)
                    setError('')
                }
            } catch (error) {
                console.error(error)

                if (active) {
                    setError('Não foi possível carregar as mensagens.')
                }
            } finally {
                if (active) {
                    setLoading(false)
                }
            }
        }

        loadInitialMessages()

        return () => {
            active = false
        }
    }, [fetchMessages])

    // Buscar repositórios e projetos em destaque
    useEffect(() => {
        let active = true

        async function loadProjects() {
            try {
                const [githubData, featuredResult] = await Promise.all([
                    getRepositories(),

                    supabase
                        .from('featured_projects')
                        .select('repo_full_name, is_featured')
                ])

                if (featuredResult.error) {
                    throw featuredResult.error
                }

                if (active) {
                    setRepositories(githubData || [])

                    const selected = (featuredResult.data || [])
                        .filter((project) => project.is_featured)
                        .map((project) => project.repo_full_name)

                    setFeaturedNames(selected)
                }
            } catch (error) {
                console.error('Erro ao carregar projetos:', error)

                if (active) {
                    setProjectError(
                        'Não foi possível carregar os projetos. Confira as permissões do Supabase e a conexão com o GitHub.'
                    )
                }
            } finally {
                if (active) {
                    setProjectsLoading(false)
                }
            }
        }

        loadProjects()

        return () => {
            active = false
        }
    }, [])

    // Atualizar mensagens manualmente
    async function handleRefresh() {
        setLoading(true)
        setError('')

        try {
            const data = await fetchMessages()
            setMessages(data)
        } catch (error) {
            console.error(error)
            setError('Não foi possível atualizar as mensagens.')
        } finally {
            setLoading(false)
        }
    }

    // Marcar mensagem como respondida
    async function handleResponded(id) {
        setUpdatingId(id)
        setError('')

        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ status: 'responded' })
                .eq('id', id)

            if (error) {
                throw error
            }

            setMessages((current) =>
                current.map((message) =>
                    message.id === id
                        ? { ...message, status: 'responded' }
                        : message
                )
            )
        } catch (error) {
            console.error(error)
            setError('Não foi possível atualizar a mensagem.')
        } finally {
            setUpdatingId(null)
        }
    }

    // Selecionar ou retirar um projeto dos destaques
    function handleToggleFeatured(repoName) {
        setProjectError('')
        setProjectNotice('')

        if (featuredNames.includes(repoName)) {
            setFeaturedNames((current) =>
                current.filter((name) => name !== repoName)
            )
            return
        }

        if (featuredNames.length >= 3) {
            setProjectError(
                'Você pode selecionar no máximo três projetos.'
            )
            return
        }

        setFeaturedNames((current) => [
            ...current,
            repoName
        ])
    }

    // Salvar projetos selecionados no Supabase
    async function handleSaveProjects() {
        setSavingProjects(true)
        setProjectError('')
        setProjectNotice('')

        try {
            if (featuredNames.length === 0) {
                throw new Error('Selecione pelo menos um projeto.')
            }

            const { data: existingProjects, error: existingError } =
                await supabase
                    .from('featured_projects')
                    .select('repo_full_name')

            if (existingError) {
                throw existingError
            }

            const allNames = [
                ...new Set([
                    ...(existingProjects || []).map(
                        (project) => project.repo_full_name
                    ),
                    ...featuredNames
                ])
            ]

            const selectedSet = new Set(featuredNames)

            const records = allNames.map((name) => ({
                repo_full_name: name,
                is_featured: selectedSet.has(name)
            }))

            const { error: saveError } = await supabase
                .from('featured_projects')
                .upsert(records, {
                    onConflict: 'repo_full_name'
                })

            if (saveError) {
                throw saveError
            }

            await queryClient.invalidateQueries({
                queryKey: ['featured-projects']
            })

            setProjectNotice(
                'Projetos em destaque salvos com sucesso!'
            )
        } catch (error) {
            console.error('Erro ao salvar projetos:', error)

            setProjectError(
                error.message || 'Não foi possível salvar os projetos.'
            )
        } finally {
            setSavingProjects(false)
        }
    }

    // Sair da conta
    async function handleLogout() {
        const { error } = await signOut()

        if (error) {
            setError('Não foi possível sair da conta.')
            return
        }

        navigate('/login', { replace: true })
    }

    const pendingMessages = messages.filter(
        (message) => message.status === 'new'
    ).length

    const respondedMessages = messages.filter(
        (message) => message.status === 'responded'
    ).length

    return (
        <section className="page-section container dashboard-page">

            {/* Cabeçalho */}
            <div className="dashboard-header">
                <div>
                    <p className="eyebrow">ÁREA ADMINISTRATIVA</p>

                    <h1>Meu Dashboard</h1>

                    <p>Bem-vindo, {user?.email}</p>
                </div>

                <div className="dashboard-actions">
                    <button
                        className="button button-secondary"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <RefreshCw size={17} />
                        Atualizar
                    </button>

                    <button
                        className="button button-primary"
                        onClick={handleLogout}
                    >
                        <LogOut size={17} />
                        Sair
                    </button>
                </div>
            </div>

            {/* Indicadores */}
            <div className="dashboard-stats">
                <div className="dashboard-stat">
                    <Mail size={24} />
                    <span>Mensagens recebidas</span>
                    <strong>{messages.length}</strong>
                </div>

                <div className="dashboard-stat">
                    <Clock size={24} />
                    <span>Pendentes</span>
                    <strong>{pendingMessages}</strong>
                </div>

                <div className="dashboard-stat">
                    <CheckCircle size={24} />
                    <span>Respondidas</span>
                    <strong>{respondedMessages}</strong>
                </div>
            </div>

            {/* Gerenciamento de mensagens */}
            <div className="dashboard-messages">
                <div className="dashboard-section-heading">
                    <h2>Mensagens recebidas</h2>
                    <span>{messages.length} mensagens</span>
                </div>

                {error && (
                    <p className="field-error" role="alert">
                        {error}
                    </p>
                )}

                {loading ? (
                    <p>Carregando mensagens...</p>
                ) : messages.length === 0 ? (
                    <p>Nenhuma mensagem recebida ainda.</p>
                ) : (
                    messages.map((message) => (
                        <article
                            className="dashboard-message"
                            key={message.id}
                        >
                            <div className="dashboard-message-header">
                                <div>
                                    <h3>{message.subject}</h3>

                                    <p>
                                        {message.name} — {message.email}
                                    </p>
                                </div>

                                <span
                                    className={
                                        message.status === 'new'
                                            ? 'message-status new'
                                            : 'message-status responded'
                                    }
                                >
                                    {message.status === 'new'
                                        ? 'Nova'
                                        : 'Respondida'}
                                </span>
                            </div>

                            <p className="dashboard-message-content">
                                {message.message}
                            </p>

                            <small>
                                Recebida em:{' '}
                                {new Date(message.created_at)
                                    .toLocaleString('pt-BR')}
                            </small>

                            <div className="dashboard-message-actions">
                                <a
                                    className="button button-secondary"
                                    href={`mailto:${message.email}?subject=${encodeURIComponent(
                                        `Re: ${message.subject}`
                                    )}`}
                                >
                                    Responder por e-mail
                                </a>

                                {message.status === 'new' && (
                                    <button
                                        className="button button-primary"
                                        onClick={() =>
                                            handleResponded(message.id)
                                        }
                                        disabled={updatingId === message.id}
                                    >
                                        <CheckCircle size={16} />

                                        {updatingId === message.id
                                            ? 'Atualizando...'
                                            : 'Marcar como respondida'}
                                    </button>
                                )}
                            </div>
                        </article>
                    ))
                )}
            </div>

            {/* Gerenciamento de projetos */}
            <div className="dashboard-projects">

                <div className="dashboard-section-heading">
                    <div>
                        <p className="eyebrow">GITHUB</p>

                        <h2>Projetos em destaque</h2>

                        <p>
                            Escolha até três projetos para aparecerem
                            na página inicial do seu portfólio.
                        </p>
                    </div>

                    <Code2 size={28} />
                </div>

                <p>
                    Projetos selecionados: {featuredNames.length}/3
                </p>

                {projectError && (
                    <p className="field-error" role="alert">
                        {projectError}
                    </p>
                )}

                {projectNotice && (
                    <p
                        className="notice notice-success"
                        role="status"
                    >
                        {projectNotice}
                    </p>
                )}

                {projectsLoading ? (
                    <p>Carregando repositórios do GitHub...</p>
                ) : repositories.length === 0 ? (
                    <p>Nenhum repositório público encontrado.</p>
                ) : (
                    <div className="dashboard-project-list">
                        {repositories.map((project) => {
                            const selected = featuredNames.includes(
                                project.full_name
                            )

                            return (
                                <label
                                    className="dashboard-project-option"
                                    key={project.id}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        disabled={
                                            !selected &&
                                            featuredNames.length >= 3
                                        }
                                        onChange={() =>
                                            handleToggleFeatured(
                                                project.full_name
                                            )
                                        }
                                    />

                                    <span>
                                        <strong>
                                            {project.full_name}
                                        </strong>

                                        <small>
                                            {project.description ||
                                                'Sem descrição disponível.'}
                                        </small>

                                        <small>
                                            Linguagem:{' '}
                                            {project.language ||
                                                'Não informada'}
                                        </small>
                                    </span>

                                    <Star
                                        size={20}
                                        fill={
                                            selected
                                                ? 'currentColor'
                                                : 'none'
                                        }
                                    />
                                </label>
                            )
                        })}
                    </div>
                )}

                <button
                    className="button button-primary"
                    onClick={handleSaveProjects}
                    disabled={savingProjects || projectsLoading}
                >
                    <Save size={17} />

                    {savingProjects
                        ? 'Salvando...'
                        : 'Salvar projetos em destaque'}
                </button>

            </div>

        </section>
    )
}