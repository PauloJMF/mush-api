const MailerConfig = Object.freeze({
  fromEmail: process.env.MAILER_FROM_EMAIL || 'no-reply@mushmanager.com',
  host: process.env.MAILER_HOST || 'localhost',
  port: process.env.MAILER_PORT || 1025,
  secure: process.env.MAILER_SECURE === 'true',
  auth: {
    user: process.env.MAILER_AUTH_USER || 'project.1', // generated ethereal user
    pass: process.env.MAILER_AUTH_PASSWORD || 'secret.1' // generated ethereal password
  }
})
export { MailerConfig }
