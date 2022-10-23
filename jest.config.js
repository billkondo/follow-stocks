/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  maxWorkers: 1,
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/renderer/components$1',
    '^@errors(.*)$': '<rootDir>/src/domain/errors$1',
    '^@services(.*)$': '<rootDir>/src/main/services$1',
    '^@sqlite(.*)$': '<rootDir>/src/main/services/sqlite$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
};
