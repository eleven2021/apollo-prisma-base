import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type user = {
  user_email: string
  user_id: number
}

export interface Context {
  prisma: PrismaClient,
  user: user
}

const getUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.SECRET || 'any') as user
    }
    return null
  } catch (err) {
    return null
  }
}

export function createContext(req: any): Context {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    let user = getUser(token)
    if (!user)
      user = { user_email: '', user_id: 0 }
    return {
      user,
      prisma,
    }
}
