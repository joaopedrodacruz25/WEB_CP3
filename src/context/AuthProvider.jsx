import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { supabase } from '../services/supabase.js'

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true

        async function checkAdmin(currentSession) {
            if (!active) return

            setSession(currentSession)

            if (!currentSession) {
                setIsAdmin(false)
                setLoading(false)
                return
            }

            const { data, error } = await supabase.rpc('is_admin')

            if (!active) return

            setIsAdmin(!error && data === true)
            setLoading(false)
        }

        async function loadSession() {
            const { data, error } = await supabase.auth.getSession()

            if (!active) return

            if (error) {
                setSession(null)
                setIsAdmin(false)
                setLoading(false)
                return
            }

            await checkAdmin(data.session)
        }

        loadSession()

        const { data } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setTimeout(() => {
                    checkAdmin(newSession)
                }, 0)
            }
        )

        return () => {
            active = false
            data.subscription.unsubscribe()
        }
    }, [])

    async function signIn(email, password) {
        setLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setLoading(false)
            return { error }
        }

        const { data: admin, error: adminError } =
            await supabase.rpc('is_admin')

        if (adminError || admin !== true) {
            await supabase.auth.signOut()

            setSession(null)
            setIsAdmin(false)
            setLoading(false)

            return {
                error: new Error('Esta conta não possui autorização de administrador.')
            }
        }

        setSession(data.session)
        setIsAdmin(true)
        setLoading(false)

        return { error: null }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            setSession(null)
            setIsAdmin(false)
        }

        return { error }
    }

    const value = {
        session,
        user: session?.user ?? null,
        isAdmin,
        loading,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}