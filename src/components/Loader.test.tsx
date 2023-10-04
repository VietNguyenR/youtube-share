import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

test('Should render Loader component', () => {
  render(<Loader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
