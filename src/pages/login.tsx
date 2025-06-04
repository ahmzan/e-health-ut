import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useCallback, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [error, setError] = useState<string>()

  const signIn = useCallback(() => {
    if (!email || !password) return

    signInWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        console.log('user', userCred.user)

        if (userCred.user) navigate('/admin')
      })
      .catch(err => {
        console.log('err', err)

        if (err.message) setError(err.message)
      })
  }, [email, password, navigate])

  return (
    <div className={cn('flex flex-col gap-6 h-full items-center justify-center')}>
      <Card>
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>Masukan kredensial</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault()
              signIn()
            }}
          >
            <div className='flex flex-col gap-6'>
              {error && (
                <Alert variant='destructive'>
                  <AlertCircleIcon />
                  <AlertTitle>Terjadi kesalahan</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='ahmad@ecampus.ut.ac.id'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input id='password' type='password' required onChange={e => setPassword(e.target.value)} />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
