import React, {useEffect} from 'react';
import InvoiceTable from './table/InvoiceTable';
import {addYears, format, parse, subYears} from 'date-fns';
import DatePicker, {registerLocale} from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import t from '../i18n/translations';
import {useNavigate, useParams} from 'react-router-dom';
import {formatYearMonthPath} from '../util/dateUtils';
import AppSpinner from '../spinner/AppSpinner';
import './Invoice.scss';
import {useInvoices} from '../hooks/useInvoices';
import {useCognitoGroup} from '../hooks/useCognitoGroup';
import InvoiceContainer from './container/InvoiceContainer';

interface IProps {
  identityId?: string;
}

registerLocale('pl', pl);

const InvoiceView: React.FC<IProps> = ({identityId}) => {
  const now = new Date();
  const navigate = useNavigate();
  const [user] = useCognitoGroup();
  const {year = format(now, 'yyyy'), month = format(now, 'MM')} = useParams();
  const invoicesDirectory = year + '-' + month;
  const {invoices, loading, refetch} = useInvoices(invoicesDirectory, identityId);
  const today = parse(invoicesDirectory, 'yyyy-MM', now);
  const path = user ? '/invoices/' : '/admin/';

  useEffect(() => {
    refetch();
  }, [path, year, month]);

  return (
    <>
      <h2>{t.datePicker.selectMonth}</h2>
      <div className="invoice-view">
        <DatePicker
          selected={today}
          onChange={(date: Date) => navigate(path + formatYearMonthPath(date))}
          dateFormat="yyyy-MM"
          locale="pl"
          minDate={subYears(today, 2)}
          maxDate={addYears(today, 1)}
          showMonthYearPicker
        />
        {loading ? <AppSpinner className="invoice-view__spinner" /> : <InvoiceContainer invoices={invoices} fetchInvoices={refetch} />}
      </div>
    </>
  );
};

export default InvoiceView;
