import js from '@eslint/js';
import globals from 'globals';
import security from 'eslint-plugin-security';

export default [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // Node.js globals like __dirname, process, etc.
      parserOptions: {
        sourceType: 'module', // Use 'script' if you aren't using ES modules
      },
    },
    plugins: {
      security, // Node.js security checks
    },
    rules: {
      ...js.configs.recommended.rules,
      ...security.configs.recommended.rules,

      // Common backend adjustments
      'no-console': 'off', // Allow console.log in backend
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused args that start with _
    },
  },
];