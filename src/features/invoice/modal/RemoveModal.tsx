import React from 'react';
import t from '../../../assets/translations';
import {Storage} from 'aws-amplify';
import {IModal} from '../../../types/IModal';
import {Box, Button, Card, CardActions, CardContent, Modal, Typography} from '@mui/material';

interface IProps {
  onClose: () => void;
}

type Props = IModal & IProps;

const RemoveModal: React.FC<Props> = ({s3Key, show, onClose}) => {
  const {title, description, close, ok} = t.invoice.remove;
  const remove = async () => {
    await Storage.remove(s3Key, {level: 'protected'});
    onClose();
  };

  return (
    <Modal open={show} onClose={onClose}>
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
            <Typography>{description}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={onClose}>
              {close}
            </Button>
            <Button variant="outlined" color="error" onClick={remove}>
              {ok}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default RemoveModal;
