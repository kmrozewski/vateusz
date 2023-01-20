import {format} from 'date-fns';

export const formatYearMonthPath = (date?: Date) => {
  const now = date ? date : new Date();
  return format(now, 'yyyy') + '/' + format(now, 'MM');
};

export const formatYearMonth = (year: string, month: string) => year + '-' + month;
