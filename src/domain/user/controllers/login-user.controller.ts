import { LoginUserInput, LoginUserUsecase } from '../use-cases/login-user.usecase'
import { Request, Response } from 'express'
import { ValidationError } from '../../../shared/errors/validation.error'

class LoginUserController {
  constructor (private readonly useCase: LoginUserUsecase) {
  }

  validate (userProps: LoginUserInput): void {
    const validation = new ValidationError('Register User Error')
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

  async handle (request: Request, response: Response, next: any): Promise<Response> {
    try {
      const loginProps: LoginUserInput = request.body
      this.validate(loginProps)
      const loginResponse = await this.useCase.execute(loginProps)
      return response.status(200).json(loginResponse)
    } catch (error) {
      next(error)
    }
  }
}

export { LoginUserController }
