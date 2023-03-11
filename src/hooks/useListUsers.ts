import {useEffect, useState} from 'react';
import {useApiClient, USERS_ENDPOINT} from './useApiClient';
import {IUser} from '../types/IUser';

export const useListUsers = (): [IUser[], boolean] => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const client = useApiClient();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await client.call({method: 'GET', endpoint: USERS_ENDPOINT});
      const items = 'Items' in response ? (response.Items as IUser[]) : [];
      setUsers(items.filter(user => !user.groups.includes('admin')));
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return [users, loading];
};
