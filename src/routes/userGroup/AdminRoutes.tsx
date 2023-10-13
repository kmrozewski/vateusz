import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {format} from 'date-fns';
import {Pages} from '../../resources/Pages';

const AdminView = React.lazy(() => import('../../features/invoice/InvoiceAdminView'));
const CalculatorView = React.lazy(() => import('../../features/calculator/CalculatorView'));

const AdminRoutes: React.FC = () => {
  const now = new Date();
  const month = format(now, 'MM');
  const year = format(now, 'yyyy');

  return (
    <Routes>
      <Route path={Pages.Home} element={<Navigate to={`/admin/${year}/${month}`} replace />} />
      <Route path={Pages.Admin} element={<AdminView />} />
      <Route path={Pages.Calculator} element={<CalculatorView />} />
    </Routes>
  );
};

export default AdminRoutes;
