const MailerConfig = Object.freeze({
  fromEmail: process.env.MAILER_FROM_EMAIL || 'no-reply@mushmanager.com',
  host: process.env.MAILER_FROM_EMAIL || 'localhost',
  port: process.env.MAILER_FROM_EMAIL || 1025,
  secure: process.env.MAILER_FROM_EMAIL || false,
  auth: {
    user: process.env.MAILER_FROM_EMAIL || 'project.1', // generated ethereal user
    pass: process.env.MAILER_FROM_EMAIL || 'secret.1' // generated ethereal password
  }
})
export { MailerConfig }
