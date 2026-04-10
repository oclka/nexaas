import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import promise from 'eslint-plugin-promise';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarJs from 'eslint-plugin-sonarjs';
import tsdoc from 'eslint-plugin-tsdoc';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

import { GLOBAL_IGNORES } from './global-ignores.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  sonarJs.configs.recommended,
  promise.configs['flat/recommended'],
  unicorn.configs['recommended'],
  prettier,
  globalIgnores(GLOBAL_IGNORES),
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,mts,cjs,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      tsdoc,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'tsdoc/syntax': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          replacements: {
            e2e: false,
          },
          allowList: {
            db: true,
            e2e: true,
            env: true,
            err: true,
            generateStaticParams: true,
            res: true,
            req: true,
          },
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-string-raw': 'off',
    },
  },
  // TESTS & STRYKER PLUGINS
  {
    files: [
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.e2e-spec.ts',
      '**/*.e2e-spec.tsx',
      'tests/**/*',
      '.stryker-plugins/**',
    ],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'promise/param-names': 'off',
      'promise/valid-params': 'off',
      'sonarjs/no-clear-text-protocols': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-hardcoded-ip': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
    },
  },
]);

export default eslintConfig;
