import { fileURLToPath } from 'url';
import { dirname } from 'path';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['src/**/*.{ts,tsx}'], // Explicitly include TypeScript and TSX files
    ignores: ['dist', 'node_modules'], // Exclude only necessary directories
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      reactHooks,
      reactRefresh
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true // Replaces the removed option
    }
  },
  // Include recommended configurations directly
  js.configs.recommended, // Include JavaScript recommended rules
  typescript.configs.recommended, // Include TypeScript recommended rules
  react.configs.recommended, // Include React recommended rules
  reactHooks.configs.recommended // Include React Hooks recommended rules
];