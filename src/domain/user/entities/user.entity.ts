import crypto from 'crypto'
import { JwtConfig } from '../../../shared/config/jwt.config'
import jwt from 'jsonwebtoken'
import { ApplicationConfig } from '../../../shared/config/application.config'

type UserProps = {
  name: string
  email: string
  password: string
  email_verification_code?: string
  email_verified_at?: Date | null
  created_at?: Date
  updated_at?: Date
}

class User {
  public readonly id: string

  constructor (private props: UserProps, id?: string) {
    this.id = id || crypto.randomUUID()
    const date = new Date()
    const verificationCode = crypto.randomBytes(64).toString('hex')
    this.props = {
      ...props,
      email_verification_code: props.email_verification_code || verificationCode,
      email_verified_at: props.email_verified_at || null,
      created_at: props.created_at || date,
      updated_at: props.updated_at || date
    }
  }

  confirmEmail () {
    this.email_verified_at = new Date()
  }

  generateActivationLink (): string {
    return ApplicationConfig.appUrl + ApplicationConfig.activationEndpoint + this.email_verification_code
  }

  async hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex')
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(salt + ':' + derivedKey.toString('hex'))
      })
    })
  }

  async verify (password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':')
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(key === derivedKey.toString('hex'))
      })
    })
  }

  async updatePassword (password: string) {
    const hashedPassword = await this.hashPassword(password)
    if (this.password === hashedPassword) {
      throw new Error('Cannot update password to the same password')
    }
    this.password = hashedPassword
  }

  async generateToken (): Promise<string> {
    const data = {
      id: this.id,
      name: this.name,
      time: new Date().getTime()
    }
    return jwt.sign(data, JwtConfig.secret)
  }

  get name () {
    return this.props.name
  }

  private set name (value: string) {
    this.props.name = value
  }

  get email () {
    return this.props.email
  }

  private set email (value: string) {
    this.props.email = value
  }

  get password () {
    return this.props.password
  }

  private set password (value: string) {
    this.props.password = value
  }

  get email_verified_at () {
    return this.props.email_verified_at
  }

  private set email_verified_at (value: Date) {
    this.props.email_verified_at = value
  }

  get created_at () {
    return this.props.created_at
  }

  get updated_at () {
    return this.props.created_at
  }

  get email_verification_code () {
    return this.props.email_verification_code
  }

  toDB () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      email_verification_code: this.email_verification_code,
      email_verified_at: this.email_verified_at,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }

  toJSON () {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    }
  }
}

export { User, UserProps }
