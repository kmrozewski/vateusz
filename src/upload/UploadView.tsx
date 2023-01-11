import React, {useState} from 'react';
import {FileUploader} from '@aws-amplify/ui-react';
import {addYears, subYears} from 'date-fns';
import DatePicker from 'react-datepicker';
import t from '../i18n/translations';
import './UploadView.scss';

const UploadView: React.FC = () => {
  const today = new Date();
  const [date, setDate] = useState(today);

  return (
    <div>
      <h2>{t.upload.selectMonth}</h2>
      <div className="upload-view__date-picker">
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          dateFormat="yyyy-MM"
          locale="pl"
          minDate={subYears(today, 2)}
          maxDate={addYears(today, 1)}
          showMonthYearPicker
        />
      </div>
      <div className="mt-2">
        <FileUploader
          variation="drop"
          acceptedFileTypes={['image/*', '.pdf']}
          accessLevel="protected"
          maxSize={10_000_000}
          maxFiles={5}
          onSuccess={e => console.log('uploaded', e.key)}
          isPreviewerVisible
        />
      </div>
    </div>
  );
};

export default UploadView;
