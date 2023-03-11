import React from 'react';
import {screen, waitFor} from '@testing-library/react';
import InvoiceTable from './InvoiceTable';
import t from '../../../assets/translations';
import * as useCognitoGroupHook from '../../../hooks/useCognitoGroup';
import {renderWithAuth} from '../../../utils/renderUtils';
import {Storage} from 'aws-amplify';

const s3Key = 'someKey/kotek.gif';
const name = 'kotek.gif';
const fileSize = '10 kB';
const lastUpdated = '2022-04-02 21:37';
const invoices = [
  {
    s3Key,
    fileName: name,
    fileSize,
    lastUpdated,
  },
  {
    s3Key: '',
    fileName: '',
    fileSize: '',
    lastUpdated: '',
  },
];

describe('<InvoiceTable/>', () => {
  const mocks = {
    showRenameModal: jest.fn(),
    showRemoveModal: jest.fn(),
  };

  it('renders the table', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([true, false]);
    jest.mocked(Storage.get);
    renderWithAuth(<InvoiceTable {...mocks} invoices={invoices} />);

    // headers
    expect(screen.getByText(t.invoice.table.headers.id)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.name)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.lastUpdated)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.fileSize)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.actions)).toBeInTheDocument();

    // rows
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(fileSize)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(lastUpdated)).toBeInTheDocument();
    });
  });

  it('cognito group user has correct actions available', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([true, false]);
    renderWithAuth(<InvoiceTable {...mocks} invoices={invoices} />);

    expect(await screen.findAllByText(t.invoice.table.buttons.download)).toHaveLength(2);
    expect(await screen.findAllByText(t.invoice.table.buttons.rename)).toHaveLength(2);
    expect(await screen.findAllByText(t.invoice.table.buttons.remove)).toHaveLength(2);
  });

  it('cognito group admin has correct actions available', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([false, true]);
    renderWithAuth(<InvoiceTable {...mocks} invoices={invoices} />);

    expect(await screen.findAllByText(t.invoice.table.buttons.download)).toHaveLength(2);
    expect(screen.queryByText(t.invoice.table.buttons.rename)).not.toBeInTheDocument();
    expect(screen.queryByText(t.invoice.table.buttons.remove)).not.toBeInTheDocument();
  });
});
