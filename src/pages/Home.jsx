import {
    ArrowDown,
    ArrowRight,
    BriefcaseBusiness,
    Code2,
    Layers3,
    Mail
} from 'lucide-react'

import { Link } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'

import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Loader from '../components/Loader.jsx'

import { getRepositories } from '../services/github.js'
import { supabase } from '../services/supabase.js'

const skills = [
    'Python',
    'JavaScript',
    'React',
    'HTML',
    'CSS',
    'Git',
    'GitHub',
    'Node.js'
]

export default function Home() {

    // Buscar repositórios públicos do GitHub
    const {
        data: repositories = [],
        isLoading: isRepositoriesLoading,
        isError: isRepositoriesError,
        error: repositoriesError
    } = useQuery({
        queryKey: ['github-repositories'],
        queryFn: getRepositories,
        staleTime: 5 * 60 * 1000
    })

    // Buscar projetos selecionados no Supabase
    const {
        data: featuredNames = [],
        isLoading: isFeaturedLoading,
        isError: isFeaturedError,
        error: featuredError
    } = useQuery({
        queryKey: ['featured-projects'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('featured_projects')
                .select('repo_full_name')
                .eq('is_featured', true)

            if (error) {
                throw error
            }

            return data.map((project) => project.repo_full_name)
        },
        staleTime: 5 * 60 * 1000
    })

    // Identificar os projetos que devem aparecer na página inicial
    const featured = featuredNames.length > 0

        ? featuredNames
            .map((name) =>
                repositories.find(
                    (project) => project.full_name === name
                )
            )
            .filter(Boolean)

        : repositories.slice(0, 3)

    const isLoading = isRepositoriesLoading || isFeaturedLoading

    const isError = isRepositoriesError || isFeaturedError

    return (
        <>

            {/* Apresentação principal */}
            <section className="hero-section container">

                <div className="hero-copy">

                    <p className="eyebrow">
                        <span className="status-dot" />
                        Disponível para oportunidades e aprendizado
                    </p>

                    <h1>
                        Olá, eu sou <span>João Pedro.</span>
                        <br />
                        Estudante de Engenharia de Software.
                    </h1>

                    <p className="hero-description">
                        Estou construindo minha trajetória em tecnologia,
                        aprendendo a transformar ideias em soluções digitais
                        com código, curiosidade e dedicação.
                    </p>

                    <div className="hero-actions">

                        <Link
                            className="button button-primary"
                            to="/projetos"
                        >
                            Conheça meus projetos
                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            className="button button-secondary"
                            to="/contato"
                        >
                            <Mail size={17} />
                            Entre em contato
                        </Link>

                    </div>

                    <a className="scroll-cue" href="#sobre">
                        <ArrowDown size={16} />
                        Role para conhecer mais
                    </a>

                </div>

                <div
                    className="hero-visual"
                    aria-label="Cartão ilustrativo de desenvolvedor"
                >

                    <div className="orbit orbit-one" />
                    <div className="orbit orbit-two" />

                    <div className="code-window">

                        <div className="window-bar">
                            <i />
                            <i />
                            <i />
                            <span>portfolio.js</span>
                        </div>

                        <div className="code-content">

                            <p>
                                <span className="code-muted">01</span>
                                {' '}
                                <span className="code-purple">const</span>
                                {' '}developer = {'{'}
                            </p>

                            <p>
                                <span className="code-muted">02</span>
                                &nbsp;name: <span className="code-green">
                                    'João Pedro'
                                </span>,
                            </p>

                            <p>
                                <span className="code-muted">03</span>
                                &nbsp;focus: <span className="code-green">
                                    'Back-end'
                                </span>,
                            </p>

                            <p>
                                <span className="code-muted">04</span>
                                &nbsp;language: <span className="code-green">
                                    'Python'
                                </span>,
                            </p>

                            <p>
                                <span className="code-muted">05</span>
                                &nbsp;learning: <span className="code-green">
                                    true
                                </span>
                            </p>

                            <p>
                                <span className="code-muted">06</span>
                                {'}'}
                            </p>

                            <p className="code-cursor">▌</p>

                        </div>

                    </div>

                    <div className="floating-badge badge-top">
                        <Code2 size={16} />
                        Aprendendo sempre
                    </div>

                    <div className="floating-badge badge-bottom">
                        <Layers3 size={16} />
                        Construindo projetos
                    </div>

                </div>

            </section>

            {/* Sobre mim */}
            <section className="section container" id="sobre">

                <SectionHeading
                    eyebrow="UM POUCO SOBRE MIM"
                    title="Tecnologia, prática e evolução."
                    description="Sou estudante de Engenharia de Software na FIAP e gosto de aprender colocando a mão na massa. Tenho interesse especial em desenvolvimento back-end e venho explorando linguagens e ferramentas para criar aplicações úteis."
                />

                <div className="about-grid">

                    <div className="info-card">

                        <span className="info-icon">
                            <BriefcaseBusiness size={20} />
                        </span>

                        <h3>Minha jornada</h3>

                        <p>
                            Minha formação combina estudos acadêmicos,
                            projetos práticos e evolução constante na
                            área de desenvolvimento de software.
                        </p>

                    </div>

                    <div className="info-card">

                        <span className="info-icon">
                            <Code2 size={20} />
                        </span>

                        <h3>Meu foco</h3>

                        <p>
                            Tenho interesse em back-end, lógica de
                            programação, integração de sistemas e
                            construção de aplicações.
                        </p>

                    </div>

                    <div className="info-card">

                        <span className="info-icon">
                            <Layers3 size={20} />
                        </span>

                        <h3>Como aprendo</h3>

                        <p>
                            Busco entender os fundamentos, praticar com
                            projetos e melhorar o código a cada nova
                            experiência.
                        </p>

                    </div>

                </div>

            </section>

            {/* Tecnologias */}
            <section className="section section-muted">

                <div className="container">

                    <SectionHeading
                        eyebrow="TECNOLOGIAS"
                        title="Ferramentas que venho estudando."
                        description="Estas são algumas das tecnologias que fazem parte da minha jornada de aprendizado."
                    />

                    <div className="skills-list">

                        {skills.map((skill) => (
                            <span className="skill-pill" key={skill}>
                                {skill}
                            </span>
                        ))}

                    </div>

                </div>

            </section>

            {/* Projetos em destaque */}
            <section className="section container" id="projetos">

                <div className="section-heading-row">

                    <SectionHeading
                        eyebrow="PORTFÓLIO"
                        title="Projetos em destaque."
                        description="Os projetos são carregados diretamente da API do GitHub e selecionados pelo painel administrativo."
                    />

                    <Link
                        className="text-link desktop-link"
                        to="/projetos"
                    >
                        Ver todos
                        <ArrowRight size={16} />
                    </Link>

                </div>

                {isLoading && (
                    <Loader label="Buscando projetos no GitHub..." />
                )}

                {isError && (
                    <div className="notice notice-error">

                        <strong>
                            Não foi possível carregar os projetos.
                        </strong>

                        <p>
                            {repositoriesError?.message ||
                                featuredError?.message}
                        </p>

                        <p>
                            Confira a conexão com o GitHub e o Supabase.
                        </p>

                    </div>
                )}

                {!isLoading && !isError && featured.length === 0 && (
                    <div className="notice">

                        <strong>
                            Nenhum projeto em destaque encontrado.
                        </strong>

                        <p>
                            Acesse o dashboard para selecionar seus
                            projetos favoritos.
                        </p>

                    </div>
                )}

                {!isLoading && !isError && featured.length > 0 && (
                    <div className="projects-grid">

                        {featured.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))}

                    </div>
                )}

                <Link
                    className="text-link mobile-link"
                    to="/projetos"
                >
                    Ver todos os projetos
                    <ArrowRight size={16} />
                </Link>

            </section>

            {/* Chamada para contato */}
            <section className="cta-section container">

                <div>

                    <p className="eyebrow">
                        VAMOS CONVERSAR?
                    </p>

                    <h2>
                        Tem uma ideia ou oportunidade?
                    </h2>

                    <p>
                        Estou aberto a trocar experiências, aprender
                        e conhecer novos desafios.
                    </p>

                </div>

                <Link
                    className="button button-light"
                    to="/contato"
                >
                    Fale comigo
                    <ArrowRight size={17} />
                </Link>

            </section>

        </>
    )
}