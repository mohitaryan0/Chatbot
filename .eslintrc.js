module.exports = {
  root: true,
  extends: 'next/core-web-vitals',
  rules: {
    // Turn off all the problematic rules
    'prefer-const': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-unescaped-entities': 'off'
  }
}
