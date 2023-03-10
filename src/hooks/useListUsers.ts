import {useEffect, useState} from 'react';
import {useApiClient, USERS_ENDPOINT} from './useApiClient';

export interface IUser {
  identityId: string;
  name: string;
  groups: string;
}

interface IResponse {
  Items: IUser[];
}

export const useListUsers = (): [IUser[], boolean] => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const client = useApiClient();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await client.call<IResponse>({method: 'GET', endpoint: USERS_ENDPOINT});
      const items = 'Items' in response ? (response.Items as IUser[]) : [];
      setUsers(items);
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
