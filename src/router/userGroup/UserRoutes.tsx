import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const UploadView = React.lazy(() => import('../../upload/UploadView'));
const InvoiceView = React.lazy(() => import('../../invoice/InvoiceUserView'));

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UploadView />} />
      <Route path="/invoices/:year/:month" element={<InvoiceView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;