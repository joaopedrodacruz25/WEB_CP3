import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="page-section container not-found-page">
      <Compass size={42} />
      <p className="eyebrow">ERRO 404</p>
      <h1>Esta página não foi encontrada.</h1>
      <p>O endereço pode estar incorreto ou a página não existe mais.</p>
      <Link className="button button-primary" to="/"><ArrowLeft size={17} /> Voltar ao início</Link>
    </section>
  )
}
