import express, { NextFunction, Request, Response, Router } from 'express'
import { userRouter } from './user.router'
import { errorHandlerMiddleware } from '../middleware/error-handler.middleware'
const cors = require('cors')

const router = Router()

router.use(express.json())

router.use(cors())

router.get('/health-check', (_: Request, res: Response) => {
  res.json({
    status: 'OK'
  })
})

router.use('/users', userRouter)

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandlerMiddleware(err, req, res, next)
})

export { router }
