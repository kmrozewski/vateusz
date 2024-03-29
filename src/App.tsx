import React, {Suspense} from 'react';
import '@aws-amplify/ui-react/styles.css';
import AppRouter from './routes/AppRouter';
import {Authenticator, translations} from '@aws-amplify/ui-react';
import {Amplify, I18n} from 'aws-amplify';
import AppSpinner from './components/spinner/AppSpinner';
import {CssBaseline, PaletteMode} from '@mui/material';
import PaletteProvider from './providers/PaletteProvider';
import {useLocalStorage} from './hooks/useLocalStorage';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import pl from 'date-fns/locale/pl';
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

I18n.putVocabularies(translations);
I18n.setLanguage('pl');

const App: React.FC = () => {
  const [mode, setMode] = useLocalStorage<PaletteMode>('palette', 'light');

  return (
    <Authenticator.Provider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
        <PaletteProvider mode={mode} setMode={setMode}>
          <CssBaseline />
          <Suspense fallback={<AppSpinner />}>
            <AppRouter />
          </Suspense>
        </PaletteProvider>
      </LocalizationProvider>
    </Authenticator.Provider>
  );
};

export default App;
