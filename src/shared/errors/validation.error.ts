class ValidationError extends Error {
  readonly inputs: string[]
  readonly inputErrors: string[]

  constructor (message: string) {
    super()
    this.inputs = []
    this.inputErrors = []
  }

  hasErrors () {
    return this.inputs.length > 0
  }

  getMessage () {
    return this.inputErrors.map(input => input).join(', ')
  }

  addInputError (input: string, inputError: string) {
    this.inputs.push(input)
    this.inputErrors.push(inputError)
  }
}

export { ValidationError }
