import { RecoveryPassword } from '../entities/recovery-password.entity'

interface RecoveryPasswordRepository {
  findByHash (hash: string): Promise<RecoveryPassword | undefined>
  save(recoveryPassword: RecoveryPassword): Promise<void>
}

export { RecoveryPasswordRepository }
