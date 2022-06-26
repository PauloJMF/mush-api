import { LoginUserUseCase } from '../../../../src/domain/user/use-cases/login-user.usecase'
import { User } from '../../../../src/domain/user/entities/user.entity'
import { UseCaseError } from '../../../../src/shared/errors/use-case.error'
import { UserRepository } from '../../../../src/domain/user/repositories/user.repository'
import { UserRepositoryMemory } from '../../../../src/infrastructure/database/repositories-memory/user.repository'

let userRepository: UserRepository

describe('Login Use Case', function () {
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory()
    const user = new User({
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '123456'
    })
    await user.updatePassword('123456')
    await userRepository.save(user)
  })

  it('should login user with correct password', async function () {
    const loginProps = {
      email: 'test@gmail.com',
      password: '123456'
    }
    const loginUserUsecase = new LoginUserUseCase(userRepository)
    const tokenResponse = await loginUserUsecase.execute(loginProps)
    expect(tokenResponse.id).toBeDefined()
    expect(tokenResponse.token).toBeDefined()
  })

  it('should fail login user with wrong password', async function () {
    const loginProps = {
      email: 'test@gmail.com',
      password: '123456'
    }
    const loginUserUsecase = new LoginUserUseCase(userRepository)
    try {
      await loginUserUsecase.execute(loginProps)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(UseCaseError)
    }
  })
})
