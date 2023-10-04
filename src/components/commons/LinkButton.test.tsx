import { render, screen } from '@testing-library/react';

import { LinkButton } from './LinkButton';

test('Should render LinkButton component', () => {
  render(<LinkButton href="/test" label="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
