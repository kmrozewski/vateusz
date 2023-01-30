import React from 'react';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import AuthRouter from './AuthRouter';
import NavigationBar from '../navigation/NavigationBar';

const AppRouter: React.FC = () => {
  const {route} = useAuthenticator(context => [context.route]);

  if (route !== 'authenticated') {
    return <Authenticator />;
  }

  return (
    <AuthRouter>
      <NavigationBar />
    </AuthRouter>
  );
};

export default AppRouter;
