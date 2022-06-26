import { UserRepository } from '../repositories/user.repository'
import { Mailer } from '../../shared/Mailer'
import { RecoveryPassword } from '../entities/recovery-password.entity'
import { RecoveryPasswordRepository } from '../repositories/recovery-password.repository'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'

type ForgotPasswordInput = {
  email: string,
}

@injectable()
class ForgotPasswordUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: UserRepository,
    @inject(Types.RecoveryPasswordRepository)
    private readonly passwordRecoveryRepository: RecoveryPasswordRepository,
    @inject(Types.Mailer)
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
    await this.passwordRecoveryRepository.save(recoveryPassword)
    await this.mailer.sendRecoveryEmail(user.name, forgotPasswordInput.email, recoveryPassword.generateRecoveryLink())
  }
}

export { ForgotPasswordUseCase, ForgotPasswordInput }
