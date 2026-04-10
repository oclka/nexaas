import '@testing-library/jest-dom';
import './next-intl';

vi.mock('next/font/google', () => ({
  Inter: () => ({
    style: { fontFamily: 'inter' },
    className: 'mocked-inter-class',
    variable: '--font-inter-mocked',
  }),
}));
