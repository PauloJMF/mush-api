import { UserRepository } from '../../../domain/user/repositories/user.repository'
import { User } from '../../../domain/user/entities/user.entity'
import { Database } from '../index'
import { inject, injectable } from 'inversify'
import { Types } from '../../ioc/types'
import { PrismaClient } from '@prisma/client'
import { RecoveryPassword } from '../../../domain/user/entities/recovery-password.entity'

@injectable()
class UserRepositoryPG implements UserRepository {
  private client: PrismaClient

  constructor (
    @inject(Types.Database)
    private database: Database
  ) {
    this.client = this.database.getInstance()
  }

  async findByEmail (email: string): Promise<User | null> {
    const userProps = await this.client.users.findFirst({ where: { email } })
    if (!userProps) {
      return null
    }
    return new User(userProps, userProps.id)
  }

  async findByVerificationCode (verificationCode: string): Promise<User | undefined> {
    const userProps = await this.client.users.findFirst({
      where: {
        email_verification_code: verificationCode,
        email_verified_at: null
      }
    })
    if (!userProps) {
      return null
    }
    return new User(userProps, userProps.id)
  }

  async save (user: User): Promise<void> {
    const userData = user.toDB()
    await this.client.users.create({
      data: userData
    })
  }

  async update (user: User): Promise<void> {
    await this.client.users.update({
      data: user.toDB(),
      where: {
        id: user.id
      }
    })
  }
}

export { UserRepositoryPG }
