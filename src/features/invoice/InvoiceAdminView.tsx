import React, {useState} from 'react';
import t from '../../assets/translations';
import {useListUsers} from '../../hooks/useListUsers';
import InvoiceUserView from './InvoiceUserView';
import IdentityIdProvider from '../../providers/IdentityIdProvider';
import {List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

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
      <Typography variant="h4" component="h2" sx={{mt: '16px'}}>
        {t.admin.title}
      </Typography>
      <List component="div" sx={{mt: '12px', mb: '12px'}}>
        {users.map(user => (
          <ListItem key={user.identityId} disablePadding>
            <ListItemButton selected={user.identityId === identityId} onClick={() => setIdentityId(user.identityId)}>
              <PersonIcon sx={{mr: '8px'}} />
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IdentityIdProvider identityId={identityId}>
        <InvoiceUserView identityId={identityId} />
      </IdentityIdProvider>
    </>
  );
};

export default InvoiceAdminView;
