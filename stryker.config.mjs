import path from 'path';

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  testRunner: 'vitest',
  reporters: ['html', 'clear-text', 'progress'],
  plugins: [
    '@stryker-mutator/vitest-runner',
    '@stryker-mutator/typescript-checker',
    './.stryker-plugins/tailwind-ignorer.mjs',
  ],
  ignorers: ['tailwind'],
  timeoutMS: 240_000,
  timeoutFactor: 3,
  coverageAnalysis: 'perTest',
  mutate: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx',
    '!src/**/*.e2e-spec.ts',
    '!src/**/*.e2e-spec.tsx',
    '!src/**/*.stories.tsx',
    '!src/**/db/schemas/**',
    '!src/core/config/index.ts',
    '!src/core/security/index.ts',
    '!src/ui/components/ui/**',
    '!src/ui/fonts/index.ts',
  ],
  ignorePatterns: ['/.agent', '/.docs', '/.ops', '/.windsurf'],
  thresholds: {
    high: 95,
    low: 80,
    break: 0, // TODO: change to 65 (for setup)
  },
  vitest: {
    configFile: 'vitest.config.mjs',
  },
};
