import { RecoveryPassword } from '../entities/recovery-password.entity'

interface RecoveryPasswordRepository {
  findByHash (hash: string): Promise<RecoveryPassword | undefined>
  update(recoveryPassword: RecoveryPassword): Promise<void>
  save(recoveryPassword: RecoveryPassword): Promise<void>
}

export { RecoveryPasswordRepository }
