module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
    mocha: true,
  },
  extends: ['standard', 'plugin:vue/vue3-essential', 'eslint:recommended'],
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
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'prefer-const': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', { named: 'never' }],
    'vue/multi-word-component-names': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
