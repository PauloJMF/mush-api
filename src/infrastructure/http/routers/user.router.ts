import { NextFunction, Request, Response, Router } from 'express'
import { UserRepositoryPG } from '../../database/repositories/user.repository'
import { PrismaDatabase } from '../../database/implementations/prisma.database'
import { RegisterUserController } from '../../../domain/user/controllers/register-user.controller'
import { RegisterUserUsecase } from '../../../domain/user/use-cases/register-user.usecase'

const userRouter = Router()
const prismaClient = new PrismaDatabase()
const userRepository = new UserRepositoryPG(prismaClient)
const registerUseCase = new RegisterUserUsecase(userRepository)
const registerController = new RegisterUserController(registerUseCase)

userRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  return await registerController.handle(req, res, next)
})

export { userRouter }
