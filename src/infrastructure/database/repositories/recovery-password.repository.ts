import { Database } from '../index'
import { inject, injectable } from 'inversify'
import { Types } from '../../ioc/types'
import { PrismaClient } from '@prisma/client'
import { RecoveryPasswordRepository } from '../../../domain/user/repositories/recovery-password.repository'
import { RecoveryPassword } from '../../../domain/user/entities/recovery-password.entity'

@injectable()
class RecoveryPasswordRepositoryPG implements RecoveryPasswordRepository {
  private client: PrismaClient

  constructor (
    @inject(Types.Database)
    private database: Database
  ) {
    this.client = this.database.getInstance()
  }

  async findByHash (hash: string): Promise<RecoveryPassword | undefined> {
    const recoveryPasswordProps = await this.client.recovery_passwords.findFirst({
      where: { hash }
    })
    return new RecoveryPassword(recoveryPasswordProps, recoveryPasswordProps.id)
  }

  async save (recoveryPassword: RecoveryPassword): Promise<void> {
    await this.client.recovery_passwords.create({
      data: recoveryPassword.toDB()
    })
  }
}

export { RecoveryPasswordRepositoryPG }
