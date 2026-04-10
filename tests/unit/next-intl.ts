import '@testing-library/jest-dom/vitest';

import React from 'react';

const createT = (ns: string) => {
  const t = (key: string, values?: any) => {
    const valuesString = values ? `(${JSON.stringify(values)})` : '';
    return `${ns}.${key}${valuesString}`;
  };
  t.rich = (key: string, components?: any) => {
    if (!components) return `${ns}.${key}_rich`;
    return React.createElement(
      React.Fragment,
      null,
      `${ns}.${key}_rich`,
      Object.entries(components).map(([tag, c], index) =>
        typeof c === 'function'
          ? React.createElement(
              React.Fragment,
              { key: index },
              c(`[${key}_rich_${tag}_children]`),
            )
          : null,
      ),
    );
  };
  return t;
};

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
  useTranslations: vi.fn((ns) => createT(ns)),
  NextIntlClientProvider: vi.fn(({ children }) => children),
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: vi.fn().mockReturnValue({
    Link: vi.fn(),
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
    getPathname: vi.fn(),
  }),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async (config) => {
    const ns = typeof config === 'string' ? config : config?.namespace;
    return createT(ns || 'default');
  }),
  getMessages: vi.fn(async () => ({})),
}));
