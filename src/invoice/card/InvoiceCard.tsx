import React from 'react';
import {Card} from 'react-bootstrap';
import {Invoice} from '../../hooks/useInvoices';
import {IShowModal} from '../table/InvoiceTable';
import {IRenameModal} from '../modal/RenameModal';
import {IModal} from '../modal/RemoveModal';
import InvoiceButtons from '../buttons/InvoiceButtons';
import {useCognitoGroup} from '../../hooks/useCognitoGroup';

interface IProps {
  invoice: Invoice;
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
