const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-extended/all'],
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['<rootDir>', 'node_modules'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
