import { render, screen } from '@testing-library/react';

import LandingPage from '@/app/page';

describe('LandingPage', () => {
  it('renders', async () => {
    render(<LandingPage />);

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});
