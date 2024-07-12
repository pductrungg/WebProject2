module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    'no-unused-vars': 'off',
    'react/no-unescaped-entities': ['error', {forbid: ['>', '}']}],
    'react/prop-types': ['off'],
    'no-undef': 'warn',
  },
};
