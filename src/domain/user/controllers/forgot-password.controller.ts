import { Request, Response } from 'express'
import { ValidationError } from '../../../shared/errors/validation.error'
import { ForgotPasswordInput, ForgotPasswordUseCase } from '../use-cases/forgot-password.usecase'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'

@injectable()
class ForgotPasswordController {
  constructor (
    @inject(Types.ForgotPasswordUseCase)
    private readonly useCase: ForgotPasswordUseCase) {
  }

  validate (forgotPasswordProps: ForgotPasswordInput): void {
    const validation = new ValidationError('ForgotPassword Error')
    if (!forgotPasswordProps.email) {
      validation.addInputError('email', 'Email is required')
    }
    if (validation.hasErrors()) {
      throw validation
    }
  }

  async handle (request: Request, response: Response, next: any): Promise<Response> {
    try {
      const loginProps: ForgotPasswordInput = request.body
      this.validate(loginProps)
      await this.useCase.execute(loginProps)
      return response.status(201).send()
    } catch (error) {
      next(error)
    }
  }
}

export { ForgotPasswordController }
