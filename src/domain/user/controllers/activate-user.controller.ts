import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { Types } from '../../../infrastructure/ioc/types'
import { ActivateUserUseCase } from '../use-cases/activate-user.usecase'

type ActivateUserParams = {
  id: string
}

@injectable()
class ActivateUserController {
  constructor (
    @inject(Types.ActivateUserUseCase)
    private readonly useCase: ActivateUserUseCase) {
  }

  async handle (request: Request, response: Response, next: any): Promise<Response> {
    try {
      const params = request.params as ActivateUserParams
      const message = await this.useCase.execute({ verificationCode: params.id })
      return response.status(200).send(message)
    } catch (error) {
      next(error)
    }
  }
}

export { ActivateUserController }
