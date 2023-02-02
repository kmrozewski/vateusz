import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import InvoiceActions from './InvoiceActions';
import t from '../../i18n/translations';
import {Storage} from 'aws-amplify';
import {renderWithAuth} from '../../util/renderUtils';

describe('<InvoiceActions/>', () => {
  const s3Key = 'someKey/kotek.gif';
  const fileName = 'kotek.gif';

  const mocks = {
    showRenameModal: jest.fn(),
    showRemoveModal: jest.fn(),
  };

  it('cognito group user has button to rename and remove file', async () => {
    jest.mocked(Storage.get);
    renderWithAuth(<InvoiceActions {...mocks} s3Key={s3Key} fileName={fileName} isUser />);

    expect(await screen.findByRole('button', {name: t.invoice.table.actions.rename})).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: t.invoice.table.actions.remove})).toBeInTheDocument();
    expect(await screen.findByRole('link', {name: t.invoice.table.actions.download})).toBeInTheDocument();
  });

  it('cognito group admin has only download a file', async () => {
    jest.mocked(Storage.get);
    renderWithAuth(<InvoiceActions {...mocks} s3Key={s3Key} fileName={fileName} isUser={false} />);

    await waitFor(() => {
      expect(screen.queryByRole('button', {name: t.invoice.table.actions.rename})).not.toBeInTheDocument();
    });
    expect(screen.queryByRole('button', {name: t.invoice.table.actions.remove})).not.toBeInTheDocument();
    expect(await screen.findByRole('link', {name: t.invoice.table.actions.download})).toBeInTheDocument();
  });
});
