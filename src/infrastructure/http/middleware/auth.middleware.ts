import { NextFunction, Request, Response } from 'express'
import { JwtConfig } from '../../../shared/config/jwt.config'
import jwt from 'jsonwebtoken'

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const token = request.header(JwtConfig.headerKey)
  try {
    const verified = jwt.verify(token, JwtConfig.secret)
    if (verified) {
      response.locals.user = verified.sub
      next()
    }
    response.status(401).json({ message: 'Unauthorized' })
  } catch (error) {
    response.status(401).json(error)
  }
}

export { authMiddleware }
