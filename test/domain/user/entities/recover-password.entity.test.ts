import { RecoveryPassword, RecoveryPasswordProps } from '../../../../src/domain/user/entities/recovery-password.entity'
import { randomUUID } from 'crypto'
import { ApplicationConfig } from '../../../../src/shared/config/application.config'

describe('Recovery Password Entity Test', function () {
  it('should create with hash and expire_at set', () => {
    const recoveryProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com'
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    expect(recoveryPassword.hash).toBeDefined()
    expect(recoveryPassword.expires_at).toBeInstanceOf(Date)
  })
  it('should generate recovery link', () => {
    const recoveryProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com'
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    const linkRegex = new RegExp(ApplicationConfig.frontEndUrl + '.*')
    const recoveryLink = recoveryPassword.generateRecoveryLink()
    expect(recoveryLink).toBeDefined()
    expect(recoveryLink).toMatch(linkRegex)
  })
  it('should return true when can use recovery password', () => {
    const recoveryProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com'
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    const canRecovery = recoveryPassword.canUseRecoveryPassword()
    expect(canRecovery).toBe(true)
  })
  it('should return false when time expired', () => {
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    const recoveryProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com',
      expires_at: yesterday
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    const canRecovery = recoveryPassword.canUseRecoveryPassword()
    expect(canRecovery).toBe(false)
  })
  it('should return false when already used', () => {
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    const recoveryProps: RecoveryPasswordProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com',
      used_at: yesterday
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    const canRecovery = recoveryPassword.canUseRecoveryPassword()
    expect(canRecovery).toBe(false)
  })
  it('should use recoveryPassword', () => {
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    const recoveryProps: RecoveryPasswordProps = {
      user_id: randomUUID(),
      email: 'test@gmail.com'
    }
    const recoveryPassword = new RecoveryPassword(recoveryProps)
    recoveryPassword.useRecoveryPassword()
    const canRecovery = recoveryPassword.canUseRecoveryPassword()
    expect(canRecovery).toBe(false)
  })
})
