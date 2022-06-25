import { Container } from 'inversify'
import { UserRepository } from '../../domain/user/repositories/user.repository'
import { Types } from './types'
import { UserRepositoryPG } from '../database/repositories/user.repository'
import { PrismaDatabase } from '../database/implementations/prisma.database'
import { Database } from '../database'
import { RegisterUserController } from '../../domain/user/controllers/register-user.controller'
import { LoginUserController } from '../../domain/user/controllers/login-user.controller'
import { RegisterUserUseCase } from '../../domain/user/use-cases/register-user.usecase'
import { LoginUserUseCase } from '../../domain/user/use-cases/login-user.usecase'
import { NodeMailer } from '../mail/mailer'
import { Mailer } from '../../domain/shared/Mailer'

const container = new Container()

container.bind<UserRepository>(Types.UserRepository).to(UserRepositoryPG).inSingletonScope()
container.bind<Database>(Types.Database).to(PrismaDatabase).inSingletonScope()
container.bind<Mailer>(Types.Mailer).to(NodeMailer).inSingletonScope()

container.bind<RegisterUserController>(Types.RegisterUserController).to(RegisterUserController)
container.bind<RegisterUserUseCase>(Types.RegisterUserUseCase).to(RegisterUserUseCase)
container.bind<LoginUserController>(Types.LoginUserController).to(LoginUserController)
container.bind<LoginUserUseCase>(Types.LoginUserUseCase).to(LoginUserUseCase)

export { container }
