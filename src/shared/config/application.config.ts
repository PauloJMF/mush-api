const ApplicationConfig = Object.freeze({
  applicationName: 'Mush-Api',
  port: process.env.PORT || 3000,
  frontEndUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  recoveryEndpoint: process.env.RECOVERY_ENDPOINT || '/recovery-forgotten-password/'
})

export { ApplicationConfig }
