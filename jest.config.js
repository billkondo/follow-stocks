/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  maxWorkers: 1,
  moduleNameMapper: {
    '^@sqlite(.*)$': '<rootDir>/src/main/services/sqlite$1',
    '^@components(.*)$': '<rootDir>/src/renderer/components$1',
    '^@services(.*)$': '<rootDir>/src/main/services$1',
  },
};
