module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/vendor/*', '!src/serviceWorker.js'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '^app-store': '<rootDir>/src/store',
    '\\.(css|scss)$': '<rootDir>/src/__test__/__mocks__/styleMock.js',
    '\\.(jpe?g|png|gif|ttf|eot|woff|md)$': '<rootDir>/src/__test__/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/src/__test__/__mocks__/svgMock.js',
    '^(expose|bundle)': '<rootDir>/src/__test__/__mocks__/moduleMock.js',
  },
  setupFiles: ['<rootDir>/src/__test__/__setup__/setupFiles.js'],
  setupFilesAfterEnv: ['<rootDir>/src/__test__/__setup__/setupTests.js'],
  snapshotSerializers: ['jest-serializer-html'],
  testEnvironment: 'jest-environment-jsdom-global',
  testEnvironmentOptions: {
    resources: 'usable',
  },
  testRegex: '/__test__/.*?\\.(test|spec)\\.js$',
  testURL: 'http://localhost:3000',
  transform: {
    '.*': 'babel-jest',
  },

  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
