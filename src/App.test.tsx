import React from 'react';
import App from './App';
import {renderWithAuth} from './util/renderUtils';
import {screen, waitFor} from '@testing-library/react';

describe('<App/>', () => {
  it('renders without crashing', async () => {
    renderWithAuth(<App />);
    await waitFor(() => expect(screen.getByText(/vateusz/i)).toBeInTheDocument());
  });
});
