import { User } from '../entities/user.entity'

interface UserRepository {
  findByVerificationCode (verificationCode: string): Promise<User | undefined>
  findByEmail (email: string): Promise<User | undefined>
  save(user: User): Promise<void>
}

export { UserRepository }
