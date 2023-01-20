import React from 'react';
import {Table} from 'react-bootstrap';
import t from '../../i18n/translations';
import {Invoice} from '../InvoiceView';
import {format} from 'date-fns';
import InvoiceActions from './InvoiceActions';

interface IProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<IProps> = ({invoices}) => {
  return (
    <Table className="mt-2" striped bordered hover>
      <thead>
        <tr>
          <th>{t.invoice.table.headers.id}</th>
          <th>{t.invoice.table.headers.name}</th>
          <th>{t.invoice.table.headers.fileSize}</th>
          <th>{t.invoice.table.headers.lastUpdated}</th>
          <th>{t.invoice.table.headers.actions}</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, index) => (
          <tr key={invoice.name}>
            <td>{index}</td>
            <td>{invoice.name.split('/')[1]}</td>
            <td>{invoice.fileSize}</td>
            <td>{format(invoice.lastUpdated, 'yyyy-MM-dd HH:mm')}</td>
            <td>
              <InvoiceActions url={'https://example.com/'} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvoiceTable;
