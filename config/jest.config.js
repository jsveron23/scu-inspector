module.exports = {
  rootDir: '../',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}
