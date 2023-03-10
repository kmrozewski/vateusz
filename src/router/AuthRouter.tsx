import React, {PropsWithChildren} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import {useCognitoGroup} from '../hooks/useCognitoGroup';
import UserRoutes from './userGroup/UserRoutes';
import AdminRoutes from './userGroup/AdminRoutes';

const AuthRouter: React.FC<PropsWithChildren> = ({children}) => {
  const [isUser] = useCognitoGroup();

  return (
    <BrowserRouter>
      <Container fluid="xl">
        {children}
        {isUser ? <UserRoutes /> : <AdminRoutes />}
      </Container>
    </BrowserRouter>
  );
};

export default AuthRouter;
