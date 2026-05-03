module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy'
    }
  }