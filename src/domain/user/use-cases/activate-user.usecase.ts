import { UserRepository } from '../repositories/user.repository'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'
import { UseCaseError } from '../../../shared/errors/use-case.error'

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

  async execute (values: ActivateUserInput): Promise<void> {
    const user = await this.userRepository.findByVerificationCode(values.verificationCode)
    if (!user) {
      throw new UseCaseError('User account does not exists')
    }
    user.confirmEmail()

    await this.userRepository.save(user)
  }
}

export { ActivateUserUseCase, ActivateUserInput }
