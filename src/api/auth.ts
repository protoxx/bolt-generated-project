import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import { queries } from '../lib/db'

const JWT_SECRET = 'your-secret-key'

export const register = async (userData: {
  name: string
  email: string
  password: string
}) => {
  const { name, email, password } = userData
  
  // Check if user exists
  const existingUser = queries.getUserByEmail.get(email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Create user
  const userId = crypto.randomUUID()
  queries.createUser.run(userId, name, email, hashedPassword, 'user')

  // Generate token
  const token = jwt.encode({ userId, email, role: 'user' }, JWT_SECRET)
  
  return { token }
}

export const login = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials

  // Get user
  const user = queries.getUserByEmail.get(email)
  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid credentials')
  }

  // Generate token
  const token = jwt.encode(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET
  )

  return { token }
}

export const verifyToken = (token: string) => {
  try {
    return jwt.decode(token, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid token')
  }
}
