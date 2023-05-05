import React, {useEffect} from 'react';
import {addYears, format, parse, subYears} from 'date-fns';
import t from '../../assets/translations';
import {useNavigate, useParams} from 'react-router-dom';
import AppSpinner from '../../components/spinner/AppSpinner';
import './Invoice.scss';
import {useInvoices} from '../../hooks/useInvoices';
import {useCognitoGroup} from '../../hooks/useCognitoGroup';
import InvoiceContainer from './container/InvoiceContainer';
import {MobileDatePicker} from '@mui/x-date-pickers';
import {formatYearMonthPath} from '../../utils/dateUtils';

interface IProps {
  identityId?: string;
}

const InvoiceUserView: React.FC<IProps> = ({identityId}) => {
  const now = new Date();
  const navigate = useNavigate();
  const [user] = useCognitoGroup();
  const {year = format(now, 'yyyy'), month = format(now, 'MM')} = useParams();
  const invoicesDirectory = year + '-' + month;
  const {invoices, loading, reFetch} = useInvoices(invoicesDirectory, identityId);
  const today = parse(invoicesDirectory, 'yyyy-MM', now);
  const path = user ? '/invoices/' : '/admin/';

  useEffect(() => {
    reFetch();
  }, [path, year, month]);

  return (
    <>
      <div className="invoice-view">
        <MobileDatePicker
          sx={{width: '100%', marginBottom: '20px'}}
          views={['month', 'year']}
          label={t.datePicker.selectMonth}
          minDate={subYears(today, 2)}
          maxDate={addYears(today, 1)}
          format="yyyy-MM"
          monthsPerRow={4}
          defaultValue={today}
          onChange={date => navigate(path + formatYearMonthPath(date ?? today))}
          closeOnSelect
          disableHighlightToday
        />
        {loading ? <AppSpinner /> : <InvoiceContainer invoices={invoices} fetchInvoices={reFetch} />}
      </div>
    </>
  );
};

export default InvoiceUserView;
