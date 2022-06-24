interface Mailer {
  sendRecoveryEmail (email: string, recoveryLink: string): Promise<void>
}

export { Mailer }
