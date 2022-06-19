class UseCaseError extends Error {
  private readonly statusCode: number
  constructor (message: string, statusCode: number = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

export { UseCaseError }
