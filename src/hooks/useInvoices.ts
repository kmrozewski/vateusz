import {useCallback, useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';
import bytes from 'bytes';
import {format} from 'date-fns';

export interface Invoice {
  s3Key: string;
  fileName: string;
  fileSize: string;
  lastUpdated: string;
}

export interface IUseInvoices {
  invoices: Invoice[];
  refetch: () => Promise<void>;
  loading: boolean;
}

export const useInvoices = (invoicesDirectory: string, identityId?: string): IUseInvoices => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = useCallback(async (invoicesDirectory: string, identityId?: string) => {
    // TODO: add pagination
    setLoading(true);
    const data = await Storage.list(
      invoicesDirectory,
      identityId ? {level: 'protected', pageSize: 'ALL', identityId} : {level: 'protected', pageSize: 'ALL'}
    );
    const files = data.results
      .filter(item => item.key && !item.key.endsWith('/'))
      .map(item => ({
        s3Key: item.key!,
        fileName: item.key!.split('/')[1],
        fileSize: bytes(item.size ?? 0),
        lastUpdated: format(item.lastModified ?? new Date(), 'yyyy-MM-dd HH:mm'),
      }));
    setInvoices(files);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInvoices(invoicesDirectory, identityId);
  }, [fetchInvoices, identityId]);

  return {invoices, loading, refetch: () => fetchInvoices(invoicesDirectory, identityId)};
};
