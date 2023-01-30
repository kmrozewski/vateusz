import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import t from '../../i18n/translations';
import {Invoice} from '../InvoiceView';
import InvoiceActions from './InvoiceActions';
import RenameModal, {IRenameModal} from '../modal/RenameModal';
import RemoveModal, {IRemoveModal} from '../modal/RemoveModal';
import {useCognitoGroup} from '../../hooks/useCognitoGroup';

interface IProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<IProps> = ({invoices}) => {
  const [isUser] = useCognitoGroup();
  const [renameModal, setRenameModal] = useState<IRenameModal>({s3Key: '', fileName: '', show: false});
  const [removeModal, setRemoveModal] = useState<IRemoveModal>({s3Key: '', show: false});

  const showRenameModal = (s3Key: string, fileName: string) => {
    setRenameModal({s3Key, fileName, show: true});
  };

  return (
    <>
      <RenameModal {...renameModal} onClose={() => setRenameModal({...renameModal, show: false})} />
      <RemoveModal {...removeModal} onClose={() => setRemoveModal({...removeModal, show: false})} />
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
              <td>{invoice.s3Key.split('/')[1]}</td>
              <td>{invoice.fileSize}</td>
              <td>{invoice.lastUpdated}</td>
              <td>
                <InvoiceActions
                  s3Key={invoice.s3Key}
                  fileName={invoice.s3Key.split('/')[1]}
                  isUser={isUser}
                  renameModal={showRenameModal}
                  removeModal={() => setRemoveModal({s3Key: invoice.s3Key, show: true})}
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
