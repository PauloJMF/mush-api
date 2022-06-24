import { UserRepository } from '../repositories/user.repository'
import { Mailer } from '../../shared/Mailer'
import { RecoveryPassword } from '../entities/recovery-password.entity'
import { RecoveryPasswordRepository } from '../repositories/recovery-password.repository'

type ForgotPasswordInput = {
  email: string,
}

class ForgotPasswordUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly passwordRecoveryRepository: RecoveryPasswordRepository,
    private readonly mailer: Mailer
  ) {
  }

  async execute (forgotPasswordInput: ForgotPasswordInput): Promise<void> {
    const user = await this.userRepository.findByEmail(forgotPasswordInput.email)

    if (!user) {
      console.log('This email is not registered')
      return
    }

    const recoveryProps = {
      user_id: user.id,
      email: forgotPasswordInput.email
    }

    const recoveryPassword = new RecoveryPassword(recoveryProps)
    console.log(recoveryPassword.toDB())
    await this.passwordRecoveryRepository.save(recoveryPassword)
    await this.mailer.sendRecoveryEmail(forgotPasswordInput.email, recoveryPassword.generateRecoveryLink())
  }
}

export { ForgotPasswordUseCase, ForgotPasswordInput }
