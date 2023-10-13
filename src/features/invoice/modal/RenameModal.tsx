import React, {useEffect, useMemo, useState} from 'react';
import t from '../../../assets/translations';
import {Storage} from 'aws-amplify';
import {getExtension, getFileNameWithoutExtension} from '../../../utils/filePathUtils';
import {IRenameModal} from '../../../types/IModal';
import {Box, Button, Card, CardActions, CardContent, Modal, TextField, Typography} from '@mui/material';

interface IProps {
  onClose: () => void;
}

type Props = IRenameModal & IProps;

const RenameModal: React.FC<Props> = ({s3Key, fileName, show, onClose}) => {
  const {title, description, close, save} = t.invoice.rename;
  const [name, setName] = useState(fileName);
  const [extension, setExtension] = useState('');
  const [available, setAvailable] = useState(true);
  const newFileName = name + extension;
  const prefix = s3Key.split('/')[0];
  const destinationKey = prefix + '/' + newFileName;
  const valid = useMemo(() => fileName.length !== 0 && newFileName.length !== 0 && newFileName !== fileName, [newFileName, fileName]);

  useEffect(() => {
    setName(getFileNameWithoutExtension(fileName));
    setExtension(getExtension(fileName, 0) ?? '');
  }, [fileName]);

  const checkAvailability = async () => {
    if (valid) {
      const files = await Storage.list(destinationKey, {level: 'protected', pageSize: 1});
      return files.results.length === 0;
    }

    return false;
  };

  const handleSave = async () => {
    const isAvailable = await checkAvailability();
    setAvailable(isAvailable);

    if (valid && isAvailable) {
      await Storage.copy({key: s3Key, level: 'protected'}, {key: destinationKey, level: 'protected'});
      await Storage.remove(s3Key, {level: 'protected'});
      onClose();
    }
  };

  return (
    <Modal open={show} onClose={onClose} aria-labelledby="rename-modal__title">
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
        }}>
        <Card>
          <CardContent>
            <Typography id="rename-modal__title" variant="h6" component="h2" sx={{mb: '12px'}}>
              {title}
            </Typography>
            <TextField
              label={available ? description : t.invoice.rename.availability}
              value={name}
              onChange={e => setName(e.target.value)}
              error={!available}
              fullWidth
            />
          </CardContent>
          <CardActions sx={{padding: '16px'}}>
            <Button variant="contained" onClick={onClose}>
              {close}
            </Button>
            <Button variant={valid ? 'outlined' : 'outlined'} onClick={() => handleSave()} disabled={!valid}>
              {save}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default RenameModal;
