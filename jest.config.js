/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/inversify.config.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true
}
