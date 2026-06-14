module.exports = {
  transform: {
    // Custom transform strips Vite's import.meta.glob before Babel runs
    '^.+\\.[jt]sx?$': './jest-transform.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@dice-roller|mathjs)/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
