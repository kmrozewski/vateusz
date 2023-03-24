import React, {useEffect, useState} from 'react';
import t from '../../../assets/translations';
import {Storage} from 'aws-amplify';
import {useIdentityId} from '../../../hooks/useIdentityId';
import {IShowModal} from '../table/InvoiceTable';
import {IModal, IRenameModal} from '../../../types/IModal';
import {Button, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

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
  const {download, rename, remove} = t.invoice.table.buttons;

  const getFile = async () => {
    const downloadUrl = await Storage.get(s3Key, {level: 'protected', identityId});
    setUrl(downloadUrl);
  };

  useEffect(() => {
    getFile();
  }, [s3Key]);

  return (
    <div className="invoice-actions__container">
      <Tooltip title={download}>
        <IconButton href={url} target="_blank" rel="noreferrer noopener">
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
      {isUser ? (
        <Tooltip title={rename}>
          <IconButton onClick={() => showRenameModal({s3Key, fileName, show: true})}>
            <DriveFileRenameOutlineIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {isUser ? (
        <Tooltip title={remove}>
          <IconButton onClick={() => showRemoveModal({s3Key, show: true})}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </div>
  );
};

export default InvoiceButtons;
