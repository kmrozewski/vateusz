import React from 'react';
import {IShowModal} from '../table/InvoiceTable';
import InvoiceButtons from '../buttons/InvoiceButtons';
import {useCognitoGroup} from '../../../hooks/useCognitoGroup';
import {IInvoice} from '../../../types/IInvoice';
import {IModal, IRenameModal} from '../../../types/IModal';
import {Card, CardContent, Typography} from '@mui/material';

interface IProps {
  invoice: IInvoice;
  showRenameModal: IShowModal<IRenameModal>;
  showRemoveModal: IShowModal<IModal>;
}
const InvoiceCard: React.FC<IProps> = ({invoice, showRenameModal, showRemoveModal}) => {
  const [isUser] = useCognitoGroup();
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{mb: '12px'}}>
          {invoice.fileName}
        </Typography>
        <Typography sx={{display: 'flex', justifyContent: 'space-between'}}>
          <span>{invoice.lastUpdated}</span>
          <span>{invoice.fileSize}</span>
        </Typography>
      </CardContent>
      <InvoiceButtons
        s3Key={invoice.s3Key}
        fileName={invoice.fileName}
        isUser={isUser}
        showRenameModal={showRenameModal}
        showRemoveModal={showRemoveModal}
      />
    </Card>
  );
};

export default InvoiceCard;
