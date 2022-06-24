const Types = {
  Mailer: Symbol('Mailer'),
  Database: Symbol('Database'),
  // User domain
  UserRepository: Symbol('UserRepository'),
  RecoveryPasswordRepository: Symbol('RecoveryPasswordRepository'),
  LoginUserController: Symbol('LoginUserController'),
  RegisterUserController: Symbol('RegisterUserController'),
  ForgotPasswordController: Symbol('ForgotPasswordController'),
  LoginUserUseCase: Symbol('LoginUserUseCase'),
  RegisterUserUseCase: Symbol('RegisterUserUseCase'),
  ForgotPasswordUseCase: Symbol('ForgotPasswordUseCase')
}

export { Types }
