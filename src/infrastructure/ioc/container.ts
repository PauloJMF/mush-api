import 'reflect-metadata'
import { Container } from 'inversify'
import { UserRepository } from '../../domain/user/repositories/user.repository'
import { Types } from './types'
import { UserRepositoryPG } from '../database/repositories-postgres/user.repository'
import { PrismaDatabase } from '../database/implementations/prisma.database'
import { Database } from '../database'
import { RegisterUserController } from '../../domain/user/controllers/register-user.controller'
import { LoginUserController } from '../../domain/user/controllers/login-user.controller'
import { RegisterUserUseCase } from '../../domain/user/use-cases/register-user.usecase'
import { LoginUserUseCase } from '../../domain/user/use-cases/login-user.usecase'
import { NodeMailer } from '../mail/mailer'
import { Mailer } from '../../domain/shared/Mailer'
import { ForgotPasswordController } from '../../domain/user/controllers/forgot-password.controller'
import { ForgotPasswordUseCase } from '../../domain/user/use-cases/forgot-password.usecase'
import { RecoveryPasswordRepository } from '../../domain/user/repositories/recovery-password.repository'
import { RecoveryPasswordRepositoryPG } from '../database/repositories-postgres/recovery-password.repository'
import { ActivateUserController } from '../../domain/user/controllers/activate-user.controller'
import { ActivateUserUseCase } from '../../domain/user/use-cases/activate-user.usecase'

const container = new Container()

container.bind<UserRepository>(Types.UserRepository).to(UserRepositoryPG).inSingletonScope()
container.bind<RecoveryPasswordRepository>(Types.RecoveryPasswordRepository).to(RecoveryPasswordRepositoryPG).inSingletonScope()
container.bind<Database>(Types.Database).to(PrismaDatabase).inSingletonScope()
container.bind<Mailer>(Types.Mailer).to(NodeMailer).inSingletonScope()

container.bind<RegisterUserController>(Types.RegisterUserController).to(RegisterUserController)
container.bind<RegisterUserUseCase>(Types.RegisterUserUseCase).to(RegisterUserUseCase)
container.bind<LoginUserController>(Types.LoginUserController).to(LoginUserController)
container.bind<LoginUserUseCase>(Types.LoginUserUseCase).to(LoginUserUseCase)
container.bind<ForgotPasswordController>(Types.ForgotPasswordController).to(ForgotPasswordController)
container.bind<ForgotPasswordUseCase>(Types.ForgotPasswordUseCase).to(ForgotPasswordUseCase)
container.bind<ActivateUserController>(Types.ActivateUserController).to(ActivateUserController)
container.bind<ActivateUserUseCase>(Types.ActivateUserUseCase).to(ActivateUserUseCase)

export { container }
