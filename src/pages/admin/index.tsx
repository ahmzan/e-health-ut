import { AuthState } from '@/hooks/auth-state'

export default function AdminPage() {
  const authState = AuthState()

  return <div>admin {JSON.stringify(authState?.email)}</div>
}
