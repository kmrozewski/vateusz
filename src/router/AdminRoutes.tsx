import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {format} from 'date-fns';

const AdminView = React.lazy(() => import('../admin/AdminView'));

const AdminRoutes: React.FC = () => {
  const now = new Date();
  const month = format(now, 'MM');
  const year = format(now, 'yyyy');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/admin/${year}/${month}`} replace />} />
      <Route path="/admin/:year/:month" element={<AdminView />} />
    </Routes>
  );
};

export default AdminRoutes;
