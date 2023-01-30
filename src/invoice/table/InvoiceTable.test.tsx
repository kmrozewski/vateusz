import React from 'react';
import {screen} from '@testing-library/react';
import InvoiceTable from './InvoiceTable';
import t from '../../i18n/translations';
import * as useCognitoGroupHook from '../../hooks/useCognitoGroup';
import {renderWithAuth} from '../../util/renderUtils';

const s3Key = 'someKey/kotek.gif';
const name = 'kotek.gif';
const fileSize = '10 kB';
const lastUpdated = '2022-04-02 21:37';
const invoices = [
  {
    s3Key,
    fileSize,
    lastUpdated,
  },
  {
    s3Key: '',
    fileSize: '',
    lastUpdated: '',
  },
];

describe('<InvoiceTable/>', () => {
  it('renders the table', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([true, false]);
    renderWithAuth(<InvoiceTable invoices={invoices} />);

    // headers
    expect(screen.getByText(t.invoice.table.headers.id)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.name)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.lastUpdated)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.fileSize)).toBeInTheDocument();
    expect(screen.getByText(t.invoice.table.headers.actions)).toBeInTheDocument();

    // rows
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(fileSize)).toBeInTheDocument();
    expect(screen.getByText(lastUpdated)).toBeInTheDocument();
  });

  it('cognito group user has correct actions available', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([true, false]);
    renderWithAuth(<InvoiceTable invoices={invoices} />);

    expect(await screen.findAllByText(t.invoice.table.actions.download)).toHaveLength(2);
    expect(await screen.findAllByText(t.invoice.table.actions.rename)).toHaveLength(2);
    expect(await screen.findAllByText(t.invoice.table.actions.remove)).toHaveLength(2);
  });

  it('cognito group admin has correct actions available', async () => {
    jest.spyOn(useCognitoGroupHook, 'useCognitoGroup').mockReturnValue([false, true]);
    renderWithAuth(<InvoiceTable invoices={invoices} />);

    expect(await screen.findAllByText(t.invoice.table.actions.download)).toHaveLength(2);
    expect(screen.queryByText(t.invoice.table.actions.rename)).not.toBeInTheDocument();
    expect(screen.queryByText(t.invoice.table.actions.remove)).not.toBeInTheDocument();
  });
});
