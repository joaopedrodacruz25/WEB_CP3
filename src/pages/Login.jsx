import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, LogIn } from 'lucide-react'

import { useAuth } from '../hooks/useAuth.js'

export default function Login() {
    const { signIn, loading } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (!email.trim() || !password) {
            setError('Preencha o e-mail e a senha.')
            return
        }

        setSubmitting(true)

        const { error: loginError } = await signIn(
            email.trim(),
            password
        )

        setSubmitting(false)

        if (loginError) {
            setError(loginError.message)
            return
        }

        const destination =
            location.state?.from?.pathname || '/dashboard'

        navigate(destination, { replace: true })
    }

    return (
        <section className="page-section container auth-page">
            <div className="auth-card">

                <span className="auth-icon">
                    <LockKeyhole size={24} />
                </span>

                <p className="eyebrow">ÁREA ADMINISTRATIVA</p>

                <h1>Entrar no dashboard</h1>

                <p>
                    Acesse sua conta para administrar seu portfólio.
                </p>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        E-mail

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Seu e-mail"
                            autoComplete="username"
                            required
                        />
                    </label>

                    <label>
                        Senha

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Sua senha"
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    {error && (
                        <p className="field-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="button button-primary"
                        type="submit"
                        disabled={loading || submitting}
                    >
                        <LogIn size={17} />

                        {submitting ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <Link className="button button-secondary" to="/">
                    Voltar ao portfólio
                </Link>

            </div>
        </section>
    )
}