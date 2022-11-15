module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['example.spec.js'],

  // Solution here: https://stackoverflow.com/a/74079349
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  /*
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  */
};
