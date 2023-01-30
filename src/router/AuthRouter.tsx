import React, {PropsWithChildren} from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const UploadView = React.lazy(() => import('../upload/UploadView'));
const InvoiceView = React.lazy(() => import('../invoice/InvoiceView'));

const AuthRouter: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <BrowserRouter>
      <Container>
        {children}
        <Routes>
          <Route path="/" element={<UploadView />} />
          <Route path="/invoices/:year/:month" element={<InvoiceView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default AuthRouter;
