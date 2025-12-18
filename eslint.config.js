// eslint.config.js (racine du monorepo)
// Flat config ESLint partagé API + Client

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    // 1️⃣ Ignores globaux
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.vite/**'],
    },

    // 2️⃣ Base JS + TS (API + Client)
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // 3️⃣ Règles communes TypeScript
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },

    // 4️⃣ Spécifique React (client uniquement)
    {
        files: ['client/**/*.{ts,tsx}'],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': (await import('eslint-plugin-react-hooks')).default,
            'react-refresh': (await import('eslint-plugin-react-refresh')).default,
        },
        rules: {
            ...(await import('eslint-plugin-react-hooks')).default.configs['recommended-latest']
                .rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },

    // 5️⃣ Désactivation des règles en conflit avec Prettier
    prettierConfig,
];
