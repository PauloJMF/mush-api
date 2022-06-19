import { RegisterUserInput, RegisterUserUsecase } from '../use-cases/register-user.usecase'
import { Request, Response } from 'express'
import { ValidationError } from '../../../shared/errors/validation.error'

class RegisterUserController {
  private readonly useCase: RegisterUserUsecase

  constructor (registerUseCase: RegisterUserUsecase) {
    this.useCase = registerUseCase
  }

  validate (userProps: RegisterUserInput): void {
    const validation = new ValidationError('Register User Error')
    if (!userProps.name) {
      validation.addInputError('name', 'Name is required')
    }
    if (!userProps.email) {
      validation.addInputError('email', 'Email is required')
    }
    if (!userProps.password) {
      validation.addInputError('password', 'Password is required')
    }
    if (validation.hasErrors()) {
      throw validation
    }
  }

  async handle (request: Request, response: Response, next:any): Promise<Response> {
    try {
      const userProps: RegisterUserInput = request.body
      this.validate(userProps)
      const user = await this.useCase.execute(userProps)
      return response.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export { RegisterUserController }
