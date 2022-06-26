import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'
import { UseCaseError } from '../../../shared/errors/use-case.error'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'
import { Mailer } from '../../shared/Mailer'

type RegisterUserInput = {
  name: string,
  email: string,
  password: string
}

type RegisterUserOutput = {
  id: string,
  name: string,
  email: string,
  created_at: Date,
  updated_at: Date
}

@injectable()
class RegisterUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private userRepository: UserRepository,
    @inject(Types.Mailer)
    private mailer: Mailer
  ) {
  }

  async execute (userProps: RegisterUserInput): Promise<RegisterUserOutput> {
    const userExists = await this.userRepository.findByEmail(userProps.email)
    if (userExists) {
      throw new UseCaseError('User email already exists')
    }
    const user = new User(userProps)
    await user.updatePassword(userProps.password)
    await this.userRepository.save(user)
    await this.mailer.sendActivationEmail(user.name, user.email, 'Teste')
    return user.toJSON()
  }
}

export { RegisterUserUseCase, RegisterUserInput, RegisterUserOutput }
