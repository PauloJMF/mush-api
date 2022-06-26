import { RegisterUserUseCase } from '../../../../src/domain/user/use-cases/register-user.usecase'
import { Mailer } from '../../../../src/domain/shared/Mailer'
import { UserRepositoryMemory } from '../../../../src/infrastructure/database/repositories-memory/user.repository'
import { User } from '../../../../src/domain/user/entities/user.entity'
import { UserRepository } from '../../../../src/domain/user/repositories/user.repository'
import spyOn = jest.spyOn

let userRepository: UserRepository

const fakeMailer: Mailer = {
  sendActivationEmail: jest.fn().mockResolvedValue(null),
  sendRecoveryEmail: jest.fn().mockResolvedValue(null)
}
describe('Register User Use Case', function () {
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory()
    const user = new User({
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '123456'
    })
    await userRepository.save(user)
  })
  it('should save new user on repository', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'test2@gmail.com',
      password: '123456'
    }

    const findByEmailSpy = spyOn(userRepository, 'findByEmail')
    const saveSpy = spyOn(userRepository, 'save')
    const registerUserUsecase = new RegisterUserUseCase(userRepository, fakeMailer)

    await registerUserUsecase.execute(userProps)

    expect(findByEmailSpy).toBeCalledWith(userProps.email)
    expect(saveSpy).toBeCalled()
  })

  it('should throw error if user already exists', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '123456'
    }

    const findByEmailSpy = spyOn(userRepository, 'findByEmail')
    const saveSpy = spyOn(userRepository, 'save')

    const registerUserUsecase = new RegisterUserUseCase(userRepository, fakeMailer)
    try {
      await registerUserUsecase.execute(userProps)
    } catch (error) {
      expect(error).toBeDefined()
    }

    expect(findByEmailSpy).toBeCalledWith(userProps.email)
    expect(saveSpy).not.toBeCalled()
  })
})
