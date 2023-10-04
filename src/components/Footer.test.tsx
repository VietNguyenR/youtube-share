import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

test('Should render Footer component', () => {
  render(<Footer />);
  expect(screen.getByText('Viet Nguyen')).toBeInTheDocument();
});
