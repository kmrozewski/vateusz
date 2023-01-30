import React from 'react';
import userEvent from '@testing-library/user-event';
import RenameModal from './RenameModal';
import {render, screen} from '@testing-library/react';
import t from '../../i18n/translations';
import {Storage} from 'aws-amplify';

describe('<RenameModal/>', () => {
  const initialKey = 'someKey/kotek.gif';
  const initialName = 'kotek.gif';
  const nameWithoutExtension = 'kotek';
  const nameSuffix = '_rychu';
  const newName = 'kotek_rychu';
  const newKey = 'someKey/kotek_rychu.gif';

  it('when new name is correct then user should be able to rename the file', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const copyMock = jest.mocked(Storage.copy).mockResolvedValue({key: ''});
    const removeMock = jest.mocked(Storage.remove);
    const listMock = jest.mocked(Storage.list).mockResolvedValue({results: [], hasNextToken: false});

    render(<RenameModal s3Key={initialKey} fileName={initialName} onClose={onClose} show />);
    const saveButton = screen.getByRole('button', {name: t.invoice.rename.save});
    const input = screen.getByRole('textbox');

    expect(saveButton).toBeDisabled();
    expect(input).toHaveValue(nameWithoutExtension);

    // user appends file name
    await user.type(input, nameSuffix);

    expect(saveButton).toBeEnabled();
    expect(input).toHaveValue(newName);

    // user submits the modal
    await user.click(saveButton);

    expect(listMock).toHaveBeenCalledWith(newKey, {level: 'protected', pageSize: 1});
    expect(copyMock).toHaveBeenCalledWith({key: initialKey, level: 'protected'}, {key: newKey, level: 'protected'});
    expect(removeMock).toHaveBeenCalledWith(initialKey, {level: 'protected'});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('when new file name is the same then user should not be able to submit', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(<RenameModal s3Key={initialKey} fileName={initialName} onClose={onClose} show />);
    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', {name: t.invoice.rename.save});

    expect(submitButton).toBeDisabled();
    expect(input).toHaveValue(nameWithoutExtension);

    // user types valid name
    await user.type(input, nameSuffix);
    expect(submitButton).toBeEnabled();
  });

  it('when new name is already used in S3 then user then notification should be displayed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const copyMock = jest.mocked(Storage.copy);
    const removeMock = jest.mocked(Storage.remove);
    const listMock = jest
      .mocked(Storage.list)
      .mockResolvedValue({results: [{key: newKey, eTag: '', lastModified: new Date(), size: 0}], hasNextToken: false});

    render(<RenameModal s3Key={initialKey} fileName={initialName} onClose={onClose} show />);

    // user appends file name
    await user.type(screen.getByRole('textbox'), nameSuffix);
    expect(screen.queryByText(t.invoice.rename.availability)).not.toBeInTheDocument();

    // user submits modal
    await user.click(screen.getByRole('button', {name: t.invoice.rename.save}));

    expect(screen.getByText(t.invoice.rename.availability)).toBeInTheDocument();
    expect(listMock).toHaveBeenCalledTimes(1);
    expect(copyMock).not.toHaveBeenCalled();
    expect(removeMock).not.toHaveBeenCalled();
  });

  it('when user cancel then file should not be renamed', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const listMock = jest.mocked(Storage.list);
    const copyMock = jest.mocked(Storage.copy);
    const removeMock = jest.mocked(Storage.remove);

    render(<RenameModal s3Key={initialKey} fileName={initialName} onClose={onClose} show />);

    // user closes modal
    await user.click(screen.getByRole('button', {name: t.invoice.rename.close}));

    expect(onClose).toHaveBeenCalled();
    expect(listMock).not.toHaveBeenCalled();
    expect(copyMock).not.toHaveBeenCalled();
    expect(removeMock).not.toHaveBeenCalled();
  });
});
