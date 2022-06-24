import { RegisterUserInput, RegisterUserUseCase } from '../use-cases/register-user.usecase'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../../shared/errors/validation.error'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'

interface RegisterUserControllerInterface {
  validate (userProps: RegisterUserInput): void,

  handle (request: Request, response: Response, next: NextFunction): Promise<Response>
}

@injectable()
class RegisterUserController implements RegisterUserControllerInterface {
  private readonly useCase: RegisterUserUseCase

  constructor (
    @inject(Types.RegisterUserUseCase)
      registerUseCase: RegisterUserUseCase
  ) {
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

  async handle (request: Request, response: Response, next: any): Promise<Response> {
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

export { RegisterUserController, RegisterUserControllerInterface }
