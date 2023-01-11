import React from 'react';
import {Spinner} from 'react-bootstrap';
import t from '../i18n/translations';

const AppSpinner: React.FC = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{t.spinner.loading}</span>
    </Spinner>
  );
};

export default AppSpinner;
