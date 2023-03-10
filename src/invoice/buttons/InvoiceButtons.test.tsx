import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import InvoiceButtons from './InvoiceButtons';
import t from '../../i18n/translations';
import {Storage} from 'aws-amplify';
import {renderWithAuth} from '../../util/renderUtils';

describe('<InvoiceButtons/>', () => {
  const s3Key = 'someKey/kotek.gif';
  const fileName = 'kotek.gif';

  const mocks = {
    showRenameModal: jest.fn(),
    showRemoveModal: jest.fn(),
  };

  it('cognito group user has button to rename and remove file', async () => {
    jest.mocked(Storage.get);
    renderWithAuth(<InvoiceButtons {...mocks} s3Key={s3Key} fileName={fileName} isUser />);

    expect(await screen.findByRole('button', {name: t.invoice.table.buttons.rename})).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: t.invoice.table.buttons.remove})).toBeInTheDocument();
    expect(await screen.findByRole('link', {name: t.invoice.table.buttons.download})).toBeInTheDocument();
  });

  it('cognito group admin has only download a file', async () => {
    jest.mocked(Storage.get);
    renderWithAuth(<InvoiceButtons {...mocks} s3Key={s3Key} fileName={fileName} isUser={false} />);

    await waitFor(() => {
      expect(screen.queryByRole('button', {name: t.invoice.table.buttons.rename})).not.toBeInTheDocument();
    });
    expect(screen.queryByRole('button', {name: t.invoice.table.buttons.remove})).not.toBeInTheDocument();
    expect(await screen.findByRole('link', {name: t.invoice.table.buttons.download})).toBeInTheDocument();
  });
});
