interface Mailer {
  sendActivationEmail (email: string, activationLink: string): Promise<void>
  sendRecoveryEmail (email: string, recoveryLink: string): Promise<void>
}

export { Mailer }
