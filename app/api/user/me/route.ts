import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'

// GET - Obter informações do usuário atual
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isAdmin = user.privateMetadata?.role === 'admin'

    return NextResponse.json({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role: isAdmin ? 'admin' : 'user',
      isAdmin
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching user info:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 