import React, {useEffect, useState} from 'react';
import t from '../../i18n/translations';
import {Button} from 'react-bootstrap';
import {Storage} from 'aws-amplify';
import {useIdentityId} from '../../hooks/useIdentityId';
import {IRenameModal} from '../modal/RenameModal';
import {IShowModal} from '../table/InvoiceTable';
import {IModal} from '../modal/RemoveModal';
import useBreakpoint from 'use-breakpoint';
import {breakpoints} from '../../breakpoint/Mobile';

interface IProps {
  s3Key: string;
  fileName: string;
  isUser: boolean;
  showRenameModal: IShowModal<IRenameModal>;
  showRemoveModal: IShowModal<IModal>;
}

const InvoiceButtons: React.FC<IProps> = ({s3Key, fileName, isUser, showRenameModal, showRemoveModal}) => {
  const [url, setUrl] = useState('');
  const identityId = useIdentityId();
  const {breakpoint} = useBreakpoint(breakpoints, 'desktop');
  const {download, rename, renameShort, remove} = t.invoice.table.buttons;

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
        {download}
      </a>
      {isUser ? (
        <Button className="mx-3" variant="outline-success" onClick={() => showRenameModal({s3Key, fileName, show: true})}>
          {breakpoint === 'mobile' ? renameShort : rename}
        </Button>
      ) : null}
      {isUser ? (
        <Button variant="outline-danger" onClick={() => showRemoveModal({s3Key, show: true})}>
          {remove}
        </Button>
      ) : null}
    </div>
  );
};

export default InvoiceButtons;
