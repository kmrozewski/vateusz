import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const UploadView = React.lazy(() => import('../../features/upload/UploadView'));
const InvoiceView = React.lazy(() => import('../../features/invoice/InvoiceUserView'));
const CalculatorView = React.lazy(() => import('../../features/calculator/CalculatorView'));

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UploadView />} />
      <Route path="/invoices/:year/:month" element={<InvoiceView />} />
      <Route path="/calculator" element={<CalculatorView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
