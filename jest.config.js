module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest'
    },
    moduleNameMapper: {      
      '\\.(css|scss)$': 'identity-obj-proxy',

      '^demo/(.*)$': '<rootDir>/src/demo/$1',
      '^features/(.*)$': '<rootDir>/src/features/$1',
      '^store/(.*)$': '<rootDir>/src/store/$1',
      '^shared/(.*)$': '<rootDir>/src/shared/$1',
    }
  }