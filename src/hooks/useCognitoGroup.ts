import {useAuthenticator} from '@aws-amplify/ui-react';

export const useCognitoGroup = (): [boolean, boolean] => {
  const {user} = useAuthenticator();
  const groups: string[] = user?.getSignInUserSession()?.getIdToken().decodePayload()['cognito:groups'] ?? [];

  return [groups.includes('user'), groups.includes('admin')];
};
