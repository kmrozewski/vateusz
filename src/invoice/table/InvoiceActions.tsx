import React from 'react';
import t from '../../i18n/translations';
import {Button} from 'react-bootstrap';

interface IProps {
  url: string;
}

const InvoiceActions: React.FC<IProps> = ({url}) => {
  return (
    <div className="invoice-actions__contianer">
      <a href={url} target="_blank" rel="noreferrer noopener" className="btn btn-outline-primary">
        {t.invoice.table.actions.download}
      </a>
      <Button className="mx-3" variant="outline-success">
        {t.invoice.table.actions.rename}
      </Button>
      <Button variant="outline-danger">{t.invoice.table.actions.remove}</Button>
    </div>
  );
};

export default InvoiceActions;
