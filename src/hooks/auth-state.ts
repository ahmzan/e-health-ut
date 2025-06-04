import { auth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export function AuthState() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => setUser(user),
      err => {
        console.log('error', err)
        setUser(null)
      }
    )

    return () => unsubscribe()
  }, [])

  return user
}
