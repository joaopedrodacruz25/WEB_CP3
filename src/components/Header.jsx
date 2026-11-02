import { Link, NavLink } from 'react-router-dom'
import { Moon, Sun, Code2 } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.js'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Ir para a página inicial">
          <span className="brand-mark"><Code2 size={19} /></span>
          <span>JP<span className="brand-dot">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/projetos">Projetos</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
