import { Code2, BriefcaseBusiness, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} João Pedro. Desenvolvido com React.</p>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={18} /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={18} /></a>
          <a href="mailto:contato@example.com" aria-label="E-mail"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  )
}
