import { render, screen } from '@testing-library/react';

import { Copyright } from './Copyright';

test('Should render Copyright component', () => {
  render(<Copyright />);
  expect(screen.getByText('Viet Nguyen')).toBeInTheDocument();
});
