import { ActivateUserUseCase } from '../../../../src/domain/user/use-cases/activate-user.usecase'
import { UserRepositoryMemory } from '../../../../src/infrastructure/database/repositories-memory/user.repository'
import { User } from '../../../../src/domain/user/entities/user.entity'
import { UseCaseError } from '../../../../src/shared/errors/use-case.error'

let userRepository: UserRepositoryMemory
let user: User

describe('Activate User Use Case', function () {
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory()
    user = new User({
      name: 'John Doe',
      email: 'test@gmail',
      password: '123456',
      email_verification_code: '123123123'
    })
    await userRepository.save(user)
  })
  it('Should activate user property', async () => {
    const activationInput = { verificationCode: '123123123' }
    const activateUseCase = new ActivateUserUseCase(userRepository)
    await activateUseCase.execute(activationInput)

    const user = await userRepository.findByVerificationCode(activationInput.verificationCode)

    expect(user.email_verified_at).not.toBeNull()
  })
  it('Should not activate user when verification does not exists', async () => {
    const activationInput = { verificationCode: 'non exists' }
    const activateUseCase = new ActivateUserUseCase(userRepository)

    try {
      await activateUseCase.execute(activationInput)
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(UseCaseError)
    }
  })
})
