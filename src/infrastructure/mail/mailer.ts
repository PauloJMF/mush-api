import { MailerConfig } from '../../shared/config/mailer.config'
import { Mailer } from '../../domain/shared/Mailer'
import { injectable } from 'inversify'

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

  async sendActivationEmail (email: string, activationLink: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
    console.log(info)
    return Promise.resolve(undefined)
  }

  async sendRecoveryEmail (email: string, recoveryLink: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
    console.log(info)
    return Promise.resolve(undefined)
  }
}

export { NodeMailer }
