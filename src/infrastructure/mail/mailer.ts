import { MailerConfig } from '../../shared/config/mailer.config'
import { Mailer } from '../../domain/shared/Mailer'
import { injectable } from 'inversify'
import { activationEmail } from '../../domain/emails/activation.email'
import { recoverPasswordEmail } from '../../domain/emails/recover-password.email'

const nodemailer = require('nodemailer')

@injectable()
class NodeMailer implements Mailer {
  private transporter: any

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: MailerConfig.host,
      port: MailerConfig.port,
      secure: MailerConfig.secure,
      auth: MailerConfig.auth
    })
  }

  async sendActivationEmail (name: string, email: string, activationLink: string): Promise<void> {
    const activationLayout = activationEmail(name, email, activationLink)
    try {
      await this.transporter.sendMail({
        from: MailerConfig.fromEmail,
        to: email,
        subject: activationLayout.subject,
        text: activationLayout.text,
        html: activationLayout.html
      })
    } catch (error) {
      console.log('Failed to send activate email', error)
    }
  }

  async sendRecoveryEmail (name: string, email: string, recoveryLink: string): Promise<void> {
    const activationLayout = recoverPasswordEmail(name, recoveryLink)
    try {
      await this.transporter.sendMail({
        from: MailerConfig.fromEmail,
        to: email,
        subject: activationLayout.subject,
        text: activationLayout.text,
        html: activationLayout.html
      })
    } catch (error) {
      console.log('Failed to send recovery email', error)
    }
  }
}

export { NodeMailer }
