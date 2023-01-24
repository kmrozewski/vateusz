import React, {useEffect, useState} from 'react';
import t from '../../i18n/translations';
import {Button} from 'react-bootstrap';
import {Storage} from 'aws-amplify';

interface IProps {
  s3Key: string;
  fileName: string;
  isUser: boolean;
  renameModal: (s3Key: string, fileName: string) => void;
  removeModal: (s3Key: string) => void;
  identityId?: string;
}

const InvoiceActions: React.FC<IProps> = ({s3Key, fileName, isUser, renameModal, removeModal, identityId}) => {
  const [url, setUrl] = useState('');

  const getFile = async () => {
    const downloadUrl = await Storage.get(s3Key, {level: 'protected', identityId});
    setUrl(downloadUrl);
  };

  useEffect(() => {
    getFile();
  }, [s3Key]);

  return (
    <div className="invoice-actions__contianer">
      <a href={url} target="_blank" rel="noreferrer noopener" className="btn btn-outline-primary">
        {t.invoice.table.actions.download}
      </a>
      {isUser ? (
        <Button className="mx-3" variant="outline-success" onClick={() => renameModal(s3Key, fileName)}>
          {t.invoice.table.actions.rename}
        </Button>
      ) : null}
      {isUser ? (
        <Button variant="outline-danger" onClick={() => removeModal(s3Key)}>
          {t.invoice.table.actions.remove}
        </Button>
      ) : null}
    </div>
  );
};

export default InvoiceActions;
