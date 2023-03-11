import {Auth} from 'aws-amplify';
import {useCallback} from 'react';
import {IRequest} from '../types/IRequest';

export const USERS_ENDPOINT = '/users';

export const useApiClient = () => {
  const baseUrl = process.env.REACT_APP_API_URL ?? '';

  const getHeaders = useCallback(
    (token: string | null) =>
      new Headers([
        ['Authorization', 'Bearer ' + token ?? ''],
        ['Content-Type', 'application/json'],
      ]),
    []
  );

  const getToken = useCallback(async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  }, []);

  const call = useCallback(async ({method, endpoint, body, token}: IRequest) => {
    const jwtToken = token ? token : await getToken();
    const response = await fetch(baseUrl + endpoint, {
      method,
      headers: getHeaders(jwtToken),
      cache: 'no-cache',
      credentials: 'same-origin',
      body,
    });
    return await response.json();
  }, []);

  return {call};
};
