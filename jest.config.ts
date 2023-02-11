
export default {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8'

}
