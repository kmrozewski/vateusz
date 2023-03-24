import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import t from '../../../assets/translations';
import InvoiceButtons from '../buttons/InvoiceButtons';
import {useCognitoGroup} from '../../../hooks/useCognitoGroup';
import {IInvoice} from '../../../types/IInvoice';
import {IModal, IRenameModal} from '../../../types/IModal';

export type IShowModal<T extends IModal> = (modalProps: T) => void;

interface IProps {
  invoices: IInvoice[];
  showRenameModal: IShowModal<IRenameModal>;
  showRemoveModal: IShowModal<IModal>;
}

const InvoiceTable: React.FC<IProps> = ({invoices, showRenameModal, showRemoveModal}) => {
  const [isUser] = useCognitoGroup();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simplpackage.je-table">
        <TableHead>
          <TableRow>
            <TableCell>{t.invoice.table.headers.id}</TableCell>
            <TableCell>{t.invoice.table.headers.name}</TableCell>
            <TableCell>{t.invoice.table.headers.fileSize}</TableCell>
            <TableCell>{t.invoice.table.headers.lastUpdated}</TableCell>
            <TableCell>{t.invoice.table.headers.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow key={invoice.s3Key} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{invoice.fileName}</TableCell>
              <TableCell>{invoice.fileSize}</TableCell>
              <TableCell>{invoice.lastUpdated}</TableCell>
              <TableCell>
                <InvoiceButtons
                  s3Key={invoice.s3Key}
                  fileName={invoice.fileName}
                  isUser={isUser}
                  showRenameModal={showRenameModal}
                  showRemoveModal={showRemoveModal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
