import { useQuery } from '@tanstack/react-query'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Loader from '../components/Loader.jsx'
import { getRepositories } from '../services/github.js'

export default function Projects() {
  const { data: repositories = [], isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['github-repositories'],
    queryFn: getRepositories,
  })

  return (
    <section className="page-section container">
      <SectionHeading eyebrow="MEU TRABALHO" title="Projetos do GitHub." description="Esta lista é atualizada automaticamente a partir dos meus repositórios públicos." />
      {isLoading && <Loader label="Carregando repositórios..." />}
      {isError && <div className="notice notice-error"><strong>Ocorreu um problema ao consultar o GitHub.</strong><p>{error.message}</p><button className="button button-secondary" onClick={() => refetch()} disabled={isFetching}>Tentar novamente</button></div>}
      {!isLoading && !isError && repositories.length === 0 && <div className="notice"><strong>Nenhum repositório público encontrado.</strong><p>Assim que houver projetos públicos no perfil configurado, eles aparecerão aqui.</p></div>}
      {!isLoading && !isError && repositories.length > 0 && <div className="projects-grid">{repositories.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
    </section>
  )
}
