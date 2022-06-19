import { RegisterUserUsecase } from '../../../../src/domain/user/use-cases/register-user.usecase'

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

    const registerUserUsecase = new RegisterUserUsecase(userRepository)

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

    const registerUserUsecase = new RegisterUserUsecase(userRepository)
    try {
      await registerUserUsecase.execute(userProps)
    } catch (error) {
      expect(error).toBeDefined()
    }

    expect(userRepository.findByEmail).toBeCalledWith(userProps.email)
    expect(userRepository.save).not.toBeCalled()
  })
})
