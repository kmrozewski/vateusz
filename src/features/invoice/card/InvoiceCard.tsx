import React from 'react';
import {Card} from 'react-bootstrap';
import {IShowModal} from '../table/InvoiceTable';
import InvoiceButtons from '../buttons/InvoiceButtons';
import {useCognitoGroup} from '../../../hooks/useCognitoGroup';
import {IInvoice} from '../../../types/IInvoice';
import {IModal, IRenameModal} from '../../../types/IModal';

interface IProps {
  invoice: IInvoice;
  showRenameModal: IShowModal<IRenameModal>;
  showRemoveModal: IShowModal<IModal>;
}
const InvoiceCard: React.FC<IProps> = ({invoice, showRenameModal, showRemoveModal}) => {
  const [isUser] = useCognitoGroup();
  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{invoice.fileName}</Card.Title>
        <Card.Text className="invoice-card__text">
          <span>{invoice.lastUpdated}</span>
          <span>{invoice.fileSize}</span>
        </Card.Text>
      </Card.Body>
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
