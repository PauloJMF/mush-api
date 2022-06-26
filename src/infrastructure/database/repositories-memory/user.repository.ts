import { UserRepository } from '../../../domain/user/repositories/user.repository'
import { User } from '../../../domain/user/entities/user.entity'
import { injectable } from 'inversify'

@injectable()
class UserRepositoryMemory implements UserRepository {
  private database: any
  userArray: User[]

  constructor (
  ) {
    this.userArray = []
  }

  async findByVerificationCode (verificationCode: string): Promise<User> {
    return this.userArray.find((user) => user.email_verification_code === verificationCode)
  }

  async findByEmail (email: string): Promise<User | null> {
    return this.userArray.find((user) => user.email === email)
  }

  async save (user: User): Promise<void> {
    this.userArray.push(user)
  }
}

export { UserRepositoryMemory }
