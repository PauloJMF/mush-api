const JwtConfig = Object.freeze({
  headerKey: 'Authorization',
  secret: process.env.JWT_SECRET || 'secret'
})
export { JwtConfig }
