import React, {useCallback, useEffect, useState} from 'react';
import InvoiceTable from './table/InvoiceTable';
import {addYears, format, parse, subYears} from 'date-fns';
import DatePicker, {registerLocale} from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import {Storage} from 'aws-amplify';
import prettyBytes from 'pretty-bytes';
import t from '../i18n/translations';
import {useNavigate, useParams} from 'react-router-dom';
import {formatYearMonth, formatYearMonthPath} from '../util/dateUtil';

export interface Invoice {
  s3Key: string;
  fileSize: string;
  lastUpdated: string;
}

registerLocale('pl', pl);

const InvoiceView: React.FC = () => {
  const navigate = useNavigate();
  const {year, month} = useParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const currentMonth = formatYearMonth(year!, month!);
  const today = parse(year + '-' + month, 'yyyy-MM', new Date());

  const fetchInvoices = useCallback(async () => {
    // TODO: add pagination
    const data = await Storage.list(currentMonth, {level: 'protected', pageSize: 'ALL'});
    const files = data.results
      .filter(item => item.key && !item.key.endsWith('/'))
      .map(item => ({
        s3Key: item.key!,
        fileSize: prettyBytes(item.size ?? 0, {locale: 'pl'}),
        lastUpdated: format(item.lastModified ?? new Date(), 'yyyy-MM-dd HH:mm'),
      }));
    setInvoices(files);
  }, [currentMonth]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <>
      <h2>{t.datePicker.selectMonth}</h2>
      <div className="date-picker">
        <DatePicker
          selected={today}
          onChange={(date: Date) => navigate('/invoices/' + formatYearMonthPath(date))}
          dateFormat="yyyy-MM"
          locale="pl"
          minDate={subYears(today, 2)}
          maxDate={addYears(today, 1)}
          showMonthYearPicker
        />
        <InvoiceTable invoices={invoices} />
      </div>
    </>
  );
};

export default InvoiceView;
