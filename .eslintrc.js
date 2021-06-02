module.exports = {
  extends: ['@nekohack/eslint-config-vue', '@vue/typescript'],
  root: true,
  env: { node: true },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
