import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Pages} from '../../resources/Pages';

const UploadView = React.lazy(() => import('../../features/upload/UploadView'));
const InvoiceView = React.lazy(() => import('../../features/invoice/InvoiceUserView'));
const CalculatorView = React.lazy(() => import('../../features/calculator/CalculatorView'));

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={Pages.Home} element={<UploadView />} />
      <Route path={Pages.Invoices} element={<InvoiceView />} />
      <Route path={Pages.Calculator} element={<CalculatorView />} />
      <Route path="*" element={<Navigate to={Pages.Home} replace />} />
    </Routes>
  );
};

export default UserRoutes;
