import { ValidationError } from '../../../shared/errors/validation.error'
import { Request, Response, NextFunction } from 'express'
import { UseCaseError } from '../../../shared/errors/use-case.error'

const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error instanceof ValidationError) {
    return res.status(422).json({
      message: error.getMessage(),
      inputs: error.inputs
    })
  }
  if (error instanceof UseCaseError) {
    return res.status(400).json({
      message: error.message
    })
  }
  return res.status(500).json({
    message: error.message
  })
}

export { errorHandlerMiddleware }
