import userEvent from '@testing-library/user-event';
import {render} from '@testing-library/react';
import React, {ReactElement} from 'react';
import {Authenticator} from '@aws-amplify/ui-react';

export const renderWithAuth = (ui: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {wrapper: Authenticator.Provider}),
  };
};
