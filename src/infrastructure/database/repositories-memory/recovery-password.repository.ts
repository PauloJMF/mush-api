import { injectable } from 'inversify'
import { RecoveryPasswordRepository } from '../../../domain/user/repositories/recovery-password.repository'
import { RecoveryPassword } from '../../../domain/user/entities/recovery-password.entity'

@injectable()
class RecoveryPasswordRepositoryMemory implements RecoveryPasswordRepository {
  private recoveryArray: RecoveryPassword[]

  constructor () {
    this.recoveryArray = []
  }

  async findByHash (hash: string): Promise<RecoveryPassword | undefined> {
    return this.recoveryArray.find((recovery) => recovery.hash === hash)
  }

  async save (recoveryPassword: RecoveryPassword): Promise<void> {
    this.recoveryArray.push(recoveryPassword)
  }

  async update (recoveryPassword: RecoveryPassword): Promise<void> {
    this.recoveryArray = this.recoveryArray.filter((existingRecovery) => existingRecovery.id !== recoveryPassword.id)
    this.recoveryArray.push(recoveryPassword)
  }
}

export { RecoveryPasswordRepositoryMemory }
