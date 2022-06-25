import { RegisterUserUseCase } from '../../../../src/domain/user/use-cases/register-user.usecase'
import { Mailer } from '../../../../src/domain/shared/Mailer'

const fakeMailer: Mailer = {
  sendActivationEmail: jest.fn().mockResolvedValue(null),
  sendRecoveryEmail: jest.fn().mockResolvedValue(null)
}

describe('Register User Use Case', function () {
  it('should save new user on repository', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'test@gmail',
      password: '123456'
    }

    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined),
      save: jest.fn().mockResolvedValue(null)
    }

    const registerUserUsecase = new RegisterUserUseCase(userRepository, fakeMailer)

    await registerUserUsecase.execute(userProps)

    expect(userRepository.findByEmail).toBeCalledWith(userProps.email)
    expect(userRepository.save).toBeCalled()
  })

  it('should throw error if user already exists', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'test@gmail',
      password: '123456'
    }

    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        name: 'John Doe',
        email: 'test@gmail',
        password: '123456'
      }),
      save: jest.fn().mockResolvedValue(null)
    }

    const registerUserUsecase = new RegisterUserUseCase(userRepository, fakeMailer)
    try {
      await registerUserUsecase.execute(userProps)
    } catch (error) {
      expect(error).toBeDefined()
    }

    expect(userRepository.findByEmail).toBeCalledWith(userProps.email)
    expect(userRepository.save).not.toBeCalled()
  })
})
