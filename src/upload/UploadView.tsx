import React, {useState} from 'react';
import {addYears, format, subYears} from 'date-fns';
import DatePicker from 'react-datepicker';
import t from '../i18n/translations';
import './UploadView.scss';
import {FileUploader} from 'react-drag-drop-files';
import classNames from 'classnames';
import AppSpinner from '../spinner/AppSpinner';
import {getContentType, getExtension, getFileNameWithoutExtension} from '../util/filePathUtils';
import {Storage} from 'aws-amplify';

const UploadView: React.FC = () => {
  const fileTypes = ['PDF', 'JPG', 'PNG', 'HEIC', 'JPEG'];
  const today = new Date();
  const [date, setDate] = useState(today);
  // change to array when more validation errors will appear
  const [maxSizeError, setMaxSizeError] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true);
    const datePrefix = format(date, 'yyyy-MM') + '/';
    const key = await getUniqueKey(datePrefix + file.name, file, datePrefix);
    await Storage.put(key, file, {level: 'protected', contentType: getContentType(file), contentDisposition: 'inline'});

    setMaxSizeError(false);
    setLoading(false);
  };

  const getUniqueKey = async (key: string, file: File, prefix: string) => {
    const keyCollisions = await Storage.list(key, {level: 'protected', pageSize: 1});
    if (keyCollisions.results.length === 0) {
      return key;
    }

    const fileName = getFileNameWithoutExtension(file.name);
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const extension = getExtension(file.name, 0);

    return `${prefix}${fileName} ${timestamp}${extension}`;
  };

  return (
    <div className="upload-view">
      <h2>{t.datePicker.selectMonth}</h2>
      <div className="date-picker">
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
      <div className={classNames('mt-2', 'upload-view__uploader')}>
        {maxSizeError ? <label className="upload-view__errors">{t.upload.errors.maxSize}</label> : null}
        {loading ? (
          <AppSpinner />
        ) : (
          <FileUploader
            types={fileTypes}
            label={t.upload.title}
            hoverTitle={t.upload.hoverTitle}
            maxSize={15}
            onSizeError={() => setMaxSizeError(true)}
            handleChange={uploadFile}
          />
        )}
      </div>
    </div>
  );
};

export default UploadView;
