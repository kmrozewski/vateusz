import {useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {CognitoIdToken} from 'amazon-cognito-identity-js';
import {AuthenticatorRoute} from '@aws-amplify/ui/dist/types/helpers/authenticator/facade';
import {useApiClient, USERS_ENDPOINT} from './useApiClient';

type TokenPayload = Record<string, string | string[]>;

// Hook to match cognito identity id with cognito user id
// that updates DynamoDB key-value store with the mapping
// to ease the process of user management (assign users to the accountant)
export const useCognitoUpdater = (route: AuthenticatorRoute): void => {
  const client = useApiClient();
  const getUserData = (identityId: string, payload: TokenPayload) =>
    JSON.stringify({
      userId: payload['sub'],
      identityId,
      name: payload['name'],
      groups: (payload['cognito:groups'] as string[]).join(','),
    });
  const sendUserData = (identityId: string, token: CognitoIdToken) =>
    client.call({method: 'POST', endpoint: USERS_ENDPOINT, body: getUserData(identityId, token.payload), token: token.getJwtToken()});

  useEffect(() => {
    if (route === 'signOut') {
      Promise.all([Auth.currentCredentials(), Auth.currentSession()]).then(([creds, session]) =>
        sendUserData(creds.identityId, session.getIdToken())
      );
    }
  }, [route]);
};
