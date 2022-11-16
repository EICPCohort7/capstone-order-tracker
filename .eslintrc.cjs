module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
    mocha: true,
  },
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
    'vue/singleline-html-element-content-newline': 'off',
  },
};
