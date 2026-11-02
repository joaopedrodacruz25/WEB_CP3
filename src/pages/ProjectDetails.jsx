import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Code2 } from 'lucide-react'
import Loader from '../components/Loader.jsx'
import { getRepository } from '../services/github.js'

export default function ProjectDetails() {
  const { repoName } = useParams()
  const { data: project, isLoading, isError, error } = useQuery({
    queryKey: ['github-repository', repoName],
    queryFn: () => getRepository(repoName),
    enabled: Boolean(repoName),
  })

  if (isLoading) return <section className="page-section container"><Loader label="Carregando detalhes do projeto..." /></section>
  if (isError) return <section className="page-section container"><div className="notice notice-error"><h2>Não foi possível abrir este projeto.</h2><p>{error.message}</p><Link className="text-link" to="/projetos"><ArrowLeft size={16} /> Voltar aos projetos</Link></div></section>

  return (
    <section className="page-section container detail-page">
      <Link className="text-link" to="/projetos"><ArrowLeft size={16} /> Voltar aos projetos</Link>
      <div className="detail-card">
        <span className="eyebrow">REPOSITÓRIO DO GITHUB</span>
        <h1>{project.name}</h1>
        <p className="detail-description">{project.description || 'Este repositório ainda não possui uma descrição.'}</p>
        <div className="detail-meta">
          <span>Linguagem: {project.language || 'Não informada'}</span>
          <span>⭐ {project.stargazers_count} estrelas</span>
          <span>Atualizado em {new Intl.DateTimeFormat('pt-BR').format(new Date(project.updated_at))}</span>
        </div>
        <a className="button button-primary" href={project.html_url} target="_blank" rel="noreferrer"><Code2 size={17} /> Abrir no GitHub <ExternalLink size={15} /></a>
      </div>
    </section>
  )
}
