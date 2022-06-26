import { User } from '../../../../src/domain/user/entities/user.entity'
import { RecoveryPasswordRepository } from '../../../../src/domain/user/repositories/recovery-password.repository'
import { ForgotPasswordUseCase } from '../../../../src/domain/user/use-cases/forgot-password.usecase'
import { Mailer } from '../../../../src/domain/shared/Mailer'
import { UserRepositoryMemory } from '../../../../src/infrastructure/database/repositories-memory/user.repository'
import { UserRepository } from '../../../../src/domain/user/repositories/user.repository'
import spyOn = jest.spyOn
import {
  RecoveryPasswordRepositoryMemory
} from '../../../../src/infrastructure/database/repositories-memory/recovery-password.repository'

const mailerMock: Mailer = {
  sendRecoveryEmail: jest.fn().mockResolvedValue(null),
  sendActivationEmail: jest.fn().mockResolvedValue(null)
}

let userRepository: UserRepository
let recoveryPasswordRepository: RecoveryPasswordRepository

describe('Forgot Password Use Case', function () {
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory()
    recoveryPasswordRepository = new RecoveryPasswordRepositoryMemory()

    const user = new User({
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '123456',
      email_verification_code: '123123123'
    })
    await userRepository.save(user)
  })

  it('Should create recovery password when email is valid', async () => {
    const recoveryProps = {
      email: 'test@gmail.com'
    }

    const findByEmailSpy = spyOn(userRepository, 'findByEmail')
    const recoverySaveSpy = spyOn(recoveryPasswordRepository, 'save')
    const forgotPasswordUsecase = new ForgotPasswordUseCase(userRepository, recoveryPasswordRepository, mailerMock)

    await forgotPasswordUsecase.execute(recoveryProps)

    expect(findByEmailSpy).toBeCalledWith(recoveryProps.email)
    expect(recoverySaveSpy).toBeCalled()
    expect(mailerMock.sendRecoveryEmail).toBeCalled()
  })
  it('Should not create when email does not exists in database', async () => {
    const recoveryProps = {
      email: 'testsetse@gmail.com'
    }
    const findByEmailSpy = spyOn(userRepository, 'findByEmail')
    const recoverySaveSpy = spyOn(recoveryPasswordRepository, 'save')
    const forgotPasswordUsecase = new ForgotPasswordUseCase(userRepository, recoveryPasswordRepository, mailerMock)

    await forgotPasswordUsecase.execute(recoveryProps)

    expect(findByEmailSpy).toBeCalledWith(recoveryProps.email)
    expect(recoverySaveSpy).not.toBeCalled()
    expect(mailerMock.sendRecoveryEmail).not.toBeCalled()
  })
})
