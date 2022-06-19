import { UserRepository } from '../../../domain/user/user.repository'
import { User } from '../../../domain/user/user.entity'
import { PrismaClient } from '@prisma/client/scripts/default-index'

class UserRepositoryPG implements UserRepository {
  private readonly database: PrismaClient

  constructor (database: PrismaClient) {
    this.database = database
  }

  async findByEmail (email: string): Promise<User | undefined> {
    return await this.database.user.findOne({ email })
  }

  async save (user: User): Promise<void> {
    await this.database.user.create({ data: user })
  }
}

export { UserRepositoryPG }
