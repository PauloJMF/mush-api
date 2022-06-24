import { LoginUserUsecase } from '../../../../src/domain/user/use-cases/login-user.usecase'
import { User } from '../../../../src/domain/user/entities/user.entity'
import { UseCaseError } from '../../../../src/shared/errors/use-case.error'

describe('Login Use Case', function () {
  it('should login user with correct password', async function () {
    const loginProps = {
      email: 'test@gmail.com',
      password: '123456'
    }
    const userRepository = {
      findByEmail: jest.fn().mockImplementation(async () => {
        const user = new User({
          name: 'John Doe',
          email: 'test@gmail',
          password: '123456'
        })
        await user.updatePassword('123456')
        return user
      }),
      save: jest.fn().mockResolvedValue(null)
    }
    const loginUserUsecase = new LoginUserUsecase(userRepository)
    const tokenResponse = await loginUserUsecase.execute(loginProps)
    expect(tokenResponse.id).toBeDefined()
    expect(tokenResponse.token).toBeDefined()
  })

  it('should fail login user with wrong password', async function () {
    const loginProps = {
      email: 'test@gmail.com',
      password: '123456'
    }
    const userRepository = {
      findByEmail: jest.fn().mockImplementation(async () => {
        return new User({
          name: 'John Doe',
          email: 'test@gmail',
          password: '123456'
        })
      }),
      save: jest.fn().mockResolvedValue(null)
    }
    const loginUserUsecase = new LoginUserUsecase(userRepository)
    try {
      await loginUserUsecase.execute(loginProps)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(UseCaseError)
    }
  })
})
