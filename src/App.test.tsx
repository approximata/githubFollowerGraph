import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders github header', () => {
  const { getByText } = render(<App />);
  const header = getByText(/GitHub Follower Sociometric/i);
  expect(header).toBeInTheDocument();
});

