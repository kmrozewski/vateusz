import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import t from '../i18n/translations';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {useAuthenticator} from '@aws-amplify/ui-react';
import {useCognitoGroup} from '../hooks/useCognitoGroup';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const {user, signOut} = useAuthenticator();
  const now = new Date();
  const year = format(now, 'yyyy');
  const month = format(now, 'MM');
  const [isUser] = useCognitoGroup();
  const invoicesPage = isUser ? '/invoices' : '/admin';

  return (
    <Navbar>
      <Navbar.Brand>{t.navigation.bar.title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {isUser && <Nav.Link onClick={() => navigate('/')}>{t.navigation.pages.home}</Nav.Link>}
          <Nav.Link onClick={() => navigate(`${invoicesPage}/${year}/${month}`)}>{t.navigation.pages.invoices}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <NavDropdown className="justify-content-end" title={user?.attributes?.name ?? t.auth.userName}>
        <NavDropdown.Item onClick={signOut}>{t.auth.signOut}</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
};

export default NavigationBar;
