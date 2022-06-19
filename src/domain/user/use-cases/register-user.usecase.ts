import { User } from '../user.entity'
import { UserRepository } from '../user.repository'

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

class RegisterUserUsecase {
  constructor (private userRepository: UserRepository) {
  }

  async execute (userProps: RegisterUserInput): Promise<RegisterUserOutput> {
    const userExists = await this.userRepository.findByEmail(userProps.email)
    if (userExists) {
      throw new Error('User email already exists')
    }
    const user = new User(userProps)
    await this.userRepository.save(user)
    return user.toJSON()
  }
}

export { RegisterUserUsecase }
