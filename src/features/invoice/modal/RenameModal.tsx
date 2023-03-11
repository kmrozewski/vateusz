import React, {useEffect, useMemo, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import t from '../../../assets/translations';
import {Storage} from 'aws-amplify';
import {getExtension, getFileNameWithoutExtension} from '../../../utils/filePathUtils';
import {IRenameModal} from '../../../types/IModal';

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
    <Modal show={show} backdrop={'static'} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{description}</Form.Label>
            <Form.Control type="input" value={name} onChange={e => setName(e.target.value)} />
            {!available && <Form.Control.Feedback type="invalid">{t.invoice.rename.availability}</Form.Control.Feedback>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => onClose()}>
          {close}
        </Button>
        <Button variant={valid ? 'outline-primary' : 'outline-warning'} onClick={() => handleSave()} disabled={!valid}>
          {save}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameModal;
