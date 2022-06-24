import crypto from 'crypto'
import { ApplicationConfig } from '../../../shared/config/application.config'

type RecoveryPasswordProps = {
  user_id: string
  email: string
  hash?: string
  used_at?: Date
  expires_at?: Date
  created_at?: Date
  updated_at?: Date
}

class RecoveryPassword {
  public readonly id: string

  constructor (private props: RecoveryPasswordProps, id?: string) {
    this.id = id || crypto.randomUUID()
    const date = new Date()
    const expireDate = new Date()
    expireDate.setMinutes(expireDate.getMinutes() + 20)
    const hash = crypto.randomBytes(64).toString('hex')
    this.props = {
      ...props,
      hash: props.hash || hash,
      used_at: props.used_at || null,
      expires_at: props.expires_at || expireDate,
      created_at: props.created_at || date,
      updated_at: props.updated_at || date
    }
  }

  generateRecoveryLink (): string {
    return ApplicationConfig.frontEndUrl + ApplicationConfig.recoveryEndpoint + this.hash.toString()
  }

  canUseRecoveryPassword (): boolean {
    const now = new Date()
    return (this.used_at == null && this.expires_at >= now)
  }

  useRecoveryPassword () {
    this.used_at = new Date()
  }

  get email () {
    return this.props.email
  }

  private set email (value: string) {
    this.props.email = value
  }

  get hash () {
    return this.props.hash
  }

  get used_at () {
    return this.props.used_at
  }

  private set used_at (value: Date) {
    this.props.used_at = value
  }

  get expires_at () {
    return this.props.expires_at
  }

  get created_at () {
    return this.props.created_at
  }

  get user_id () {
    return this.props.user_id
  }

  get updated_at () {
    return this.props.created_at
  }

  toDB () {
    return {
      id: this.id,
      user_id: this.user_id,
      email: this.email,
      expires_at: this.expires_at,
      hash: this.hash,
      used_at: this.used_at,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  toJSON () {
    return {
      id: this.id,
      user_id: this.user_id,
      email: this.email,
      expires_at: this.expires_at,
      used_at: this.used_at,
      hash: this.hash
    }
  }
}

export { RecoveryPassword, RecoveryPasswordProps }
