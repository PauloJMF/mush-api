import { UserRepository } from '../repositories/user.repository'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'

type ActivateUserInput = {
  verificationCode: string
}

@injectable()
class ActivateUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: UserRepository
  ) {
  }

  async execute (values: ActivateUserInput): Promise<string> {
    const user = await this.userRepository.findByVerificationCode(values.verificationCode)

    if (!user) {
      return 'Não encontramos sua conta ou ela já está ativa'
    }

    user.confirmEmail()

    await this.userRepository.update(user)

    return 'Conta ativada com sucesso'
  }
}

export { ActivateUserUseCase, ActivateUserInput }
