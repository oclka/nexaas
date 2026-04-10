import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { GLOBAL_IGNORES } from './global-ignores.mjs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  oxc: false,
  test: {
    globals: true,
    environment: 'jsdom',
    timeout: 30_000,
    setupFiles: ['./tests/unit/setup.ts'],
    exclude: GLOBAL_IGNORES,
    include: ['seed/**/*.spec.ts', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        '**/*.d.ts',
        '**/*.e2e-spec.ts',
        'src/__tests__/**',
        'src/**/__tests__/**',
        'src/**/__e2e__/**',
        'src/**/types/**',
        'src/**/db/schemas/**',
        'src/core/config/index.ts',
        'src/ui/fonts/index.ts',
      ],
    },
  },
});
