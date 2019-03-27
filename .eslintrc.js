module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  //extends: 'plugin:@typescript-eslint/recommended',
  extends: 'prettier',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Indent with 2 spaces
    indent: ['error', 2],
    // Indent JSX with 2 spaces
    'react/jsx-indent': ['error', 2],
    // Indent props with 2 spaces
    'react/jsx-indent-props': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
