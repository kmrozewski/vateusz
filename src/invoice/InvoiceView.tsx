import React, {useCallback, useEffect, useState} from 'react';
import InvoiceTable from './table/InvoiceTable';
import {addYears, format, parse, subYears} from 'date-fns';
import DatePicker, {registerLocale} from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import {Storage} from 'aws-amplify';
import t from '../i18n/translations';
import {useNavigate, useParams} from 'react-router-dom';
import {formatYearMonthPath} from '../util/dateUtils';
import bytes from 'bytes';
import AppSpinner from '../spinner/AppSpinner';
import './Invoice.scss';

export interface Invoice {
  s3Key: string;
  fileSize: string;
  lastUpdated: string;
}

registerLocale('pl', pl);

const InvoiceView: React.FC = () => {
  const now = new Date();
  const navigate = useNavigate();
  const {year = format(now, 'yyyy'), month = format(now, 'MM')} = useParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const invoicesDirectory = year + '-' + month;
  const today = parse(invoicesDirectory, 'yyyy-MM', now);

  const fetchInvoices = useCallback(async () => {
    // TODO: add pagination
    setLoading(true);
    const data = await Storage.list(invoicesDirectory, {level: 'protected', pageSize: 'ALL'});
    const files = data.results
      .filter(item => item.key && !item.key.endsWith('/'))
      .map(item => ({
        s3Key: item.key!,
        fileSize: bytes(item.size ?? 0),
        lastUpdated: format(item.lastModified ?? new Date(), 'yyyy-MM-dd HH:mm'),
      }));
    setInvoices(files);
    setLoading(false);
  }, [invoicesDirectory]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <>
      <h2>{t.datePicker.selectMonth}</h2>
      <div className="invoice-view">
        <DatePicker
          selected={today}
          onChange={(date: Date) => navigate('/invoices/' + formatYearMonthPath(date))}
          dateFormat="yyyy-MM"
          locale="pl"
          minDate={subYears(today, 2)}
          maxDate={addYears(today, 1)}
          showMonthYearPicker
        />
        {loading ? <AppSpinner className="invoice-view__spinner" /> : <InvoiceTable invoices={invoices} />}
      </div>
    </>
  );
};

export default InvoiceView;
