import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute.jsx'
import { useAuth } from '../hooks/useAuth.js'

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: vi.fn(),
}))

function renderProtectedRoute() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path="/login"
          element={<p>Página de login</p>}
        />

        <Route
          path="/"
          element={<p>Página inicial</p>}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<p>Dashboard protegido</p>}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Proteção do dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve redirecionar visitantes não autenticados para o login', () => {
    useAuth.mockReturnValue({
      session: null,
      isAdmin: false,
      loading: false,
    })

    renderProtectedRoute()

    expect(screen.getByText('Página de login')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard protegido')).not.toBeInTheDocument()
  })

  it('deve permitir acesso ao administrador autenticado', () => {
    useAuth.mockReturnValue({
      session: { user: { email: 'admin@email.com' } },
      isAdmin: true,
      loading: false,
    })

    renderProtectedRoute()

    expect(screen.getByText('Dashboard protegido')).toBeInTheDocument()
  })

  it('deve impedir acesso de usuários autenticados sem permissão administrativa', () => {
    useAuth.mockReturnValue({
      session: { user: { email: 'visitante@email.com' } },
      isAdmin: false,
      loading: false,
    })

    renderProtectedRoute()

    expect(screen.getByText('Página inicial')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard protegido')).not.toBeInTheDocument()
  })
})