import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import t from '../../../assets/translations';
import {Storage} from 'aws-amplify';
import {IModal} from '../../../types/IModal';

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
    <Modal show={show} backdrop={'static'} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" className="w-50" onClick={() => onClose()}>
          {close}
        </Button>
        <Button variant={'outline-danger'} className="w-25" onClick={remove}>
          {ok}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;
