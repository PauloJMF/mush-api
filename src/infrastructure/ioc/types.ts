const Types = {
  Mailer: Symbol('Mailer'),
  Database: Symbol('Database'),
  // User domain
  UserRepository: Symbol('UserRepository'),
  RecoveryPasswordRepository: Symbol('RecoveryPasswordRepository'),
  LoginUserController: Symbol('LoginUserController'),
  RegisterUserController: Symbol('RegisterUserController'),
  ForgotPasswordController: Symbol('ForgotPasswordController'),
  ActivateUserController: Symbol('ActivateUserController'),
  LoginUserUseCase: Symbol('LoginUserUseCase'),
  RegisterUserUseCase: Symbol('RegisterUserUseCase'),
  ForgotPasswordUseCase: Symbol('ForgotPasswordUseCase'),
  ActivateUserUseCase: Symbol('ActivateUserUseCase')
}

export { Types }
