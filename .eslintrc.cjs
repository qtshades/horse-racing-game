module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    quotes: ['error', 'single'],
  },
}
