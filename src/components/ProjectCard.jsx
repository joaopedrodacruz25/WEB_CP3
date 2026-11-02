import { ArrowUpRight, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const updatedDate = project.updated_at
    ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(project.updated_at))
    : 'Data indisponível'

  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-icon"><Code2 size={20} /></span>
        {project.language && <span className="language-tag">{project.language}</span>}
      </div>
      <h3>{project.name}</h3>
      <p>{project.description || 'Projeto em desenvolvimento. Acesse o repositório para ver os detalhes.'}</p>
      <div className="project-card-bottom">
        <span>Atualizado em {updatedDate}</span>
        <Link to={`/projetos/${encodeURIComponent(project.name)}`} aria-label={`Ver detalhes de ${project.name}`}>
          Detalhes <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
