module.exports = {
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'import/extensions': ['off', 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.jsx', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      },
    },
  },
};
