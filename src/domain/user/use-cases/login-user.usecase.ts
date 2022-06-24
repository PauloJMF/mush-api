import { UserRepository } from '../repositories/user.repository'
import { UseCaseError } from '../../../shared/errors/use-case.error'

type LoginUserInput = {
  email: string,
  password: string
}

type LoginUserOutput = {
  id: string,
  token: string
}

class LoginUserUsecase {
  constructor (private readonly userRepository: UserRepository) {
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

export { LoginUserUsecase, LoginUserInput, LoginUserOutput }
