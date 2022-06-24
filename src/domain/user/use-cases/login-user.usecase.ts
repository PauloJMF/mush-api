import { UserRepository } from '../repositories/user.repository'
import { UseCaseError } from '../../../shared/errors/use-case.error'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'

type LoginUserInput = {
  email: string,
  password: string
}

type LoginUserOutput = {
  id: string,
  token: string
}

@injectable()
class LoginUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: UserRepository
  ) {
  }

  async execute (loginProps: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByEmail(loginProps.email)

    if (!user) {
      throw new UseCaseError('User not found or password is incorrect')
    }

    const hashedPassword = await user.verify(loginProps.password, user.password)

    if (!hashedPassword) {
      throw new UseCaseError('User not found or password is incorrect')
    }

    const token = await user.generateToken()

    return {
      id: user.id,
      token
    }
  }
}

export { LoginUserUseCase, LoginUserInput, LoginUserOutput }
