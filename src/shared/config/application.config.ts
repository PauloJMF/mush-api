const ApplicationConfig = Object.freeze({
  applicationName: 'Mush-Api',
  port: process.env.PORT || 3000,
  frontEndUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  appUrl: process.env.APP_URL || 'http://localhost:5000',
  activationEndpoint: process.env.ACTIVATION_ENDPOINT || '/users/activate-account/',
  recoveryEndpoint: process.env.RECOVERY_ENDPOINT || '/recovery-forgotten-password/'
})

export { ApplicationConfig }
