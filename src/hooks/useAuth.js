import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth precisa ser utilizado dentro de AuthProvider.'
        )
    }

    return context
}