import React from 'react';
import {Table} from 'react-bootstrap';
import t from '../../i18n/translations';
import {Invoice} from '../../hooks/useInvoices';
import InvoiceActions from '../container/InvoiceActions';
import {useCognitoGroup} from '../../hooks/useCognitoGroup';
import {IModal} from '../modal/RemoveModal';
import {IRenameModal} from '../modal/RenameModal';

export type IShowModal<T extends IModal> = (modalProps: T) => void;

interface IProps {
  invoices: Invoice[];
  showRenameModal: IShowModal<IRenameModal>;
  showRemoveModal: IShowModal<IModal>;
}

const InvoiceTable: React.FC<IProps> = ({invoices, showRenameModal, showRemoveModal}) => {
  const [isUser] = useCognitoGroup();

  return (
    <>
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
            <tr key={invoice.s3Key}>
              <td>{index}</td>
              <td>{invoice.fileName}</td>
              <td>{invoice.fileSize}</td>
              <td>{invoice.lastUpdated}</td>
              <td>
                <InvoiceActions
                  s3Key={invoice.s3Key}
                  fileName={invoice.fileName}
                  isUser={isUser}
                  showRenameModal={showRenameModal}
                  showRemoveModal={showRemoveModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InvoiceTable;
