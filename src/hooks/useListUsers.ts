import {useEffect, useState} from 'react';
import {Storage} from 'aws-amplify';

export interface IUser {
  identityId: string;
  name: string;
}

export const useListUsers = (): [IUser[], boolean] => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const parse = async (blob: Blob): Promise<IUser[]> => {
    try {
      const data = await new Blob([blob]);
      const text = await data.text();
      return JSON.parse(text);
    } catch {
      console.error('Failed to fetch users');
      return users;
    }
  };

  const getUsers = async () => {
    setLoading(true);
    const response = await Storage.get('users.json', {level: 'private', download: true});

    if (response && response.Body) {
      const data = await parse(response.Body as Blob);
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return [users, loading];
};
