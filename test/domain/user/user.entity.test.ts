import { User, UserProps } from '../../../src/domain/user/user.entity'

describe('User Entity Test', function () {
  it('should add uuid to user', function () {
    const userProps = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    } as UserProps
    const user = new User(userProps)
    expect(user.id).toBeDefined()
  })

  it('should update password with new one', async function () {
    const userProps = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    } as UserProps
    const user = new User(userProps)
    try {
      await user.updatePassword('new password')
      await user.updatePassword('new password')
    } catch (error) {
      expect(error).toBe('Cannot update password to the same password')
    }
  })

  it('should verify user password', async function () {
    const userProps = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    } as UserProps
    const user = new User(userProps)
    await user.updatePassword('new password')
    const hashedPassword = await user.hashPassword('new password')
    const verify = await user.verify('new password', hashedPassword)
    expect(verify).toBe(true)
  })

  it('should verify email date', async function () {
    const userProps = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    } as UserProps
    const user = new User(userProps)
    expect(user.email_confirmed_at).toBeUndefined()
    user.confirmEmail()
    expect(user.email_confirmed_at).toBeDefined()
  })
})
