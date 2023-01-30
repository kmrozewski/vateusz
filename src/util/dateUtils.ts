import {format} from 'date-fns';

export const formatYearMonthPath = (date: Date, separator = '/') => {
  return format(date, 'yyyy') + '/' + format(date, 'MM');
};
