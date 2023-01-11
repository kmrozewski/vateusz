import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';

const UploadView = React.lazy(() => import('../upload/UploadView'));
const InvoiceView = React.lazy(() => import('../invoice/InvoiceView'));

const AppRouter: React.FC = () => {
  const { route } = useAuthenticator(context => [context.route]);

  if (route !== 'authenticated') {
    return <Authenticator />
  }

  return <BrowserRouter>
    <Container>
      <Routes>
        <Route path="/" element={<UploadView />} />
        <Route path="/invoices" element={<InvoiceView />} />
      </Routes>
    </Container>
  </BrowserRouter>;
};

export default AppRouter;
