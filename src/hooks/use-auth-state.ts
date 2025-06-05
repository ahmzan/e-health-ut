import { auth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        setLoading(false)
        setUser(user)
      },
      err => {
        console.log('error', err)
        setUser(null)
      }
    )

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
