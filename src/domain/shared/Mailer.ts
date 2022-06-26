interface Mailer {
  sendActivationEmail (name: string, email: string, activationLink: string): Promise<void>

  sendRecoveryEmail (name: string, email: string, recoveryLink: string): Promise<void>
}

export { Mailer }
