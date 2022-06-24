import { User } from '../../../../src/domain/user/entities/user.entity'
import { RecoveryPasswordRepository } from '../../../../src/domain/user/repositories/recovery-password.repository'
import { ForgotPasswordUseCase } from '../../../../src/domain/user/use-cases/forgot-password.usecase'
import { Mailer } from '../../../../src/domain/shared/Mailer'

const recoveryPasswordRepository: RecoveryPasswordRepository = {
  findByHash: jest.fn().mockResolvedValue(null),
  save: jest.fn().mockResolvedValue(null)
}
const mailerMock: Mailer = {
  sendRecoveryEmail: jest.fn().mockResolvedValue(null)
}

const userRepository = {
  findByEmail: jest.fn().mockImplementation(null),
  save: jest.fn().mockResolvedValue(null)
}

describe('Forgot Password Use Case', function () {
  it('Should create recovery password when email is valid', async () => {
    const recoveryProps = {
      email: 'test@gmail.com'
    }

    userRepository.findByEmail = jest.fn().mockImplementation(async () => {
      return new User({
        name: 'John Doe',
        email: 'test@gmail',
        password: '123456'
      })
    })

    const forgotPasswordUsecase = new ForgotPasswordUseCase(userRepository, recoveryPasswordRepository, mailerMock)

    await forgotPasswordUsecase.execute(recoveryProps)

    expect(userRepository.findByEmail).toBeCalledWith(recoveryProps.email)
    expect(recoveryPasswordRepository.save).toBeCalled()
    expect(mailerMock.sendRecoveryEmail).toBeCalled()
  })
  it('Should not create when email does not exists in database', async () => {
    const recoveryProps = {
      email: 'test@gmail.com'
    }

    userRepository.findByEmail = jest.fn().mockImplementation(null)

    const forgotPasswordUsecase = new ForgotPasswordUseCase(userRepository, recoveryPasswordRepository, mailerMock)

    await forgotPasswordUsecase.execute(recoveryProps)

    expect(userRepository.findByEmail).toBeCalledWith(recoveryProps.email)
    expect(recoveryPasswordRepository.save).not.toBeCalled()
    expect(mailerMock.sendRecoveryEmail).not.toBeCalled()
  })
})
