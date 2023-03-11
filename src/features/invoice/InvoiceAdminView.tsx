import React, {useState} from 'react';
import t from '../../assets/translations';
import {useListUsers} from '../../hooks/useListUsers';
import InvoiceUserView from './InvoiceUserView';
import {ListGroup} from 'react-bootstrap';
import IdentityIdProvider from '../../providers/IdentityIdProvider';

const InvoiceAdminView: React.FC = () => {
  const [users, loading] = useListUsers();
  const [identityId, setIdentityId] = useState<string>();

  if (users.length === 0 && !loading) {
    return (
      <>
        <h3>{t.admin.title}</h3>
        <div>{t.admin.empty}</div>
      </>
    );
  }

  return (
    <>
      <h2>{t.admin.title}</h2>
      <ListGroup className="mt-3 mb-3">
        {users.map(user => (
          <ListGroup.Item key={user.identityId} active={user.identityId === identityId} onClick={() => setIdentityId(user.identityId)}>
            {user.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <IdentityIdProvider identityId={identityId}>
        <InvoiceUserView identityId={identityId} />
      </IdentityIdProvider>
    </>
  );
};

export default InvoiceAdminView;
