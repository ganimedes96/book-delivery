
export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8'

}
