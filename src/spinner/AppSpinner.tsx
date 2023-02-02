import React from 'react';
import {Spinner} from 'react-bootstrap';
import t from '../i18n/translations';
import classNames from 'classnames';
import './AppSpinner.scss';

interface IProps {
  className?: string;
}
const AppSpinner: React.FC<IProps> = ({className}) => {
  return (
    <div className={classNames('app-spinner__container', className)}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t.spinner.loading}</span>
      </Spinner>
    </div>
  );
};

export default AppSpinner;
