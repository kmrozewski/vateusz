import React from 'react';
import {render, screen} from '@testing-library/react';
import InvoiceActions from './InvoiceActions';
import t from '../../i18n/translations';
import {setupMock} from '../../util/amplifyMock';

const s3Key = 'someKey/kotek.gif';
const fileName = 'kotek.gif';
describe('<InvoiceActions/>', () => {
  beforeEach(setupMock);

  it('cognito group user has button to rename and remove file', async () => {
    const renameModal = jest.fn();
    const removeModal = jest.fn();
    render(<InvoiceActions s3Key={s3Key} fileName={fileName} isUser renameModal={renameModal} removeModal={removeModal} />);

    expect(screen.getByRole('button', {name: t.invoice.table.actions.rename})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: t.invoice.table.actions.remove})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: t.invoice.table.actions.download})).toBeInTheDocument();
  });

  it('cognito group admin has only download a file', () => {
    const renameModal = jest.fn();
    const removeModal = jest.fn();
    render(<InvoiceActions s3Key={s3Key} fileName={fileName} isUser={false} renameModal={renameModal} removeModal={removeModal} />);

    expect(screen.queryByRole('button', {name: t.invoice.table.actions.rename})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: t.invoice.table.actions.remove})).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: t.invoice.table.actions.download})).toBeInTheDocument();
  });
});
