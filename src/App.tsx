import React, {Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@aws-amplify/ui-react/styles.css';
import AppRouter from './router/AppRouter';
import {Authenticator} from '@aws-amplify/ui-react';
import {Amplify} from 'aws-amplify';
import AppSpinner from './spinner/AppSpinner';
import './App.scss';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
    mandatorySignIn: true,
  },
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_S3_BUCKET,
      region: process.env.REACT_APP_S3_REGION,
    },
  },
});

function App() {
  return (
    <Authenticator.Provider>
      <Suspense fallback={<AppSpinner />}>
        <AppRouter />
      </Suspense>
    </Authenticator.Provider>
  );
}

export default App;
