module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'indent': [ 'error', 2 ],
    'max-len': ['warn', { 'code': 300, 'tabWidth': 2 }],
  },
};
