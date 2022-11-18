module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
    mocha: true,
  },
  ignorePatterns: ['server/public/js', 'test/AddressRouter.mocha.js', 'test/CustomerRouter.mocha.js', 'test/OrderDetailsRouter.mocha.js', 'test/OrderRouter.mocha.js', 'test/OrderStatusRouter.mocha.js', 'test/ProductRouter.mocha.js'],
  extends: ['plugin:vue/vue3-recommended', 'standard'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'comma-dangle': [
      'error',
      {
        functions: 'never',
        arrays: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    // 'no-unused-vars': ['warn', { destructuredArrayIgnorePattern: '^_' }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'prefer-const': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', { named: 'never' }],
    'vue/require-explicit-emits': ['off'],
    'vue/singleline-html-element-content-newline': 'off',
  },
  overrides: [
    {
      files: ['server/bin/www.js', 'server/routes/credential-routes/credentialRouter.js'],
      rules: {
        'no-unreachable': ['off'],
        'no-unused-vars': ['off'],
      },
    },
  ],
};
