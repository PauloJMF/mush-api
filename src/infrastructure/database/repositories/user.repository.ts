import { UserRepository } from '../../../domain/user/user.repository'
import { User } from '../../../domain/user/user.entity'
import { Database } from '../index'
import { PrismaClient } from '@prisma/client'

class UserRepositoryPG implements UserRepository {
  private readonly database: PrismaClient

  constructor (database: Database) {
    this.database = database.getInstance()
  }

  async findByEmail (email: string): Promise<User | null> {
    const userProps = await this.database.user.findFirst({ where: { email } })
    if (!userProps) {
      return null
    }
    return new User(userProps)
  }

  async save (user: User): Promise<void> {
    const userData = user.toDB()
    await this.database.user.create({
      data: userData
    })
  }
}

export { UserRepositoryPG }
