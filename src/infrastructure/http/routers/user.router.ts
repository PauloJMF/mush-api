import { NextFunction, Request, Response, Router } from 'express'
import { RegisterUserController } from '../../../domain/user/controllers/register-user.controller'
import { container } from '../../ioc/container'
import { Types } from '../../ioc/types'
import { LoginUserController } from '../../../domain/user/controllers/login-user.controller'
import { ForgotPasswordController } from '../../../domain/user/controllers/forgot-password.controller'

const userRouter = Router()
const registerController = container.get<RegisterUserController>(Types.RegisterUserController)
const loginController = container.get<LoginUserController>(Types.LoginUserController)
const forgotPassword = container.get<ForgotPasswordController>(Types.ForgotPasswordController)

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  return await registerController.handle(req, res, next)
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  return await loginController.handle(req, res, next)
})

userRouter.post('/forgot-password', async (req: Request, res: Response, next: NextFunction) => {
  return await forgotPassword.handle(req, res, next)
})

export { userRouter }
