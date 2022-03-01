/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  maxWorkers: 1,
  moduleNameMapper: {
    '^@sqlite(.*)$': '<rootDir>/src/main/services/sqlite$1',
  },
};
