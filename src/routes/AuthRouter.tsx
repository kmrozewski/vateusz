import React, {PropsWithChildren} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useCognitoGroup} from '../hooks/useCognitoGroup';
import UserRoutes from './userGroup/UserRoutes';
import AdminRoutes from './userGroup/AdminRoutes';
import {Container} from '@mui/material';
import {MathJaxContext} from 'better-react-mathjax';

const AuthRouter: React.FC<PropsWithChildren> = ({children}) => {
  const [isUser] = useCognitoGroup();

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        {children}
        <MathJaxContext>{isUser ? <UserRoutes /> : <AdminRoutes />}</MathJaxContext>
      </Container>
    </BrowserRouter>
  );
};

export default AuthRouter;
