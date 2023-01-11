import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const UploadView = React.lazy(() => import('../upload/UploadView'));
const InvoiceView = React.lazy(() => import('../invoice/InvoiceView'));

const AppRouter: React.FC = () => {
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
