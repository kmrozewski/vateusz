import {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {CognitoIdToken} from 'amazon-cognito-identity-js';
import {AuthenticatorRoute} from '@aws-amplify/ui/dist/types/helpers/authenticator/facade';

type TokenPayload = Record<string, string | string[]>;

// Hook to match cognito identity id with cognito user id
// that updates DynamoDB key-value store with the mapping
// to ease the process of user management (assign users to the accountant)
export const useCognitoUpdater = (route: AuthenticatorRoute): void => {
  const getHeaders = (token: string) =>
    new Headers([
      ['Authorization', 'Bearer ' + token ?? ''],
      ['Content-Type', 'application/json'],
    ]);
  const getUserData = (identityId: string, payload: TokenPayload) =>
    JSON.stringify({
      userId: payload['sub'],
      identityId,
      name: payload['name'],
      groups: (payload['cognito:groups'] as string[]).join(','),
    });
  const sendUserData = (identityId: string, token: CognitoIdToken) => {
    const baseUrl = process.env.REACT_APP_API_URL ?? '';
    return fetch(baseUrl + '/users', {
      method: 'POST',
      headers: getHeaders(token.getJwtToken()),
      cache: 'no-cache',
      credentials: 'same-origin',
      body: getUserData(identityId, token.payload),
    });
  };

  useEffect(() => {
    if (route === 'signOut') {
      Promise.all([Auth.currentCredentials(), Auth.currentSession()]).then(([creds, session]) =>
        sendUserData(creds.identityId, session.getIdToken())
      );
    }
  }, [route]);
};
