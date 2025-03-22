
export default {
  ignores: ['node_modules', 'dist'], // Ignore unnecessary directories
  overrides: [
    {
      files: ['**/*.{ts,tsx}'], // Target only TypeScript files
      plugins: ['@typescript-eslint', 'react'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript-specific rules
        'plugin:react/recommended', // React-specific rules
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json', // TypeScript integration
      },
      rules: {
        // Add custom TypeScript or React rules here, if needed
      },
    },
  ],
};