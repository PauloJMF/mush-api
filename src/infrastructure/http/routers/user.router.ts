import { NextFunction, Request, Response, Router } from 'express'
import { UserRepositoryPG } from '../../database/repositories/user.repository'
import { PrismaDatabase } from '../../database/implementations/prisma.database'
import { RegisterUserController } from '../../../domain/user/controllers/register-user.controller'
import { RegisterUserUsecase } from '../../../domain/user/use-cases/register-user.usecase'
import { LoginUserController } from '../../../domain/user/controllers/login-user.controller'
import { LoginUserUsecase } from '../../../domain/user/use-cases/login-user.usecase'

const userRouter = Router()
const prismaClient = new PrismaDatabase()
const userRepository = new UserRepositoryPG(prismaClient)
const registerUseCase = new RegisterUserUsecase(userRepository)
const registerController = new RegisterUserController(registerUseCase)
const loginUseCase = new LoginUserUsecase(userRepository)
const loginController = new LoginUserController(loginUseCase)

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  return await registerController.handle(req, res, next)
})

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  return await loginController.handle(req, res, next)
})

export { userRouter }
