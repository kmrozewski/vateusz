import React from 'react';
import {render, screen} from '@testing-library/react';
import RemoveModal from './RemoveModal';
import userEvent from '@testing-library/user-event';
import {Storage} from 'aws-amplify';
import t from '../../i18n/translations';

describe('<RemoveModal/>', () => {
  const testModalActions = async (name: string, removeCalled: boolean) => {
    const removeMock = jest.mocked(Storage.remove);
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(<RemoveModal s3Key="someKey" onClose={onClose} show />);

    await user.click(screen.getByRole('button', {name}));

    expect(onClose).toHaveBeenCalledTimes(1);
    const removeStorageExpect = removeCalled ? expect(removeMock) : expect(removeMock).not;
    removeStorageExpect.toHaveBeenCalledWith('someKey', {level: 'protected'});
  };

  it('when user submit then file should be removed', () => testModalActions(t.invoice.remove.ok, true));
  it('when user cancel then file should not be removed', () => testModalActions(t.invoice.remove.close, false));
});
