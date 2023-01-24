import {Amplify} from 'aws-amplify';

export const setupMock = () => {
  Amplify.configure({
    Auth: {
      userPoolWebClientId: 'XXXXXXXXXXXXXXXXXX',
      identityPoolId: 'us-east-1:XXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      region: 'eu-fake-1',
      userPoolId: 'eu-fake-1_XXXXXXXXX',
    },
    Storage: {
      AWSS3: {
        bucket: 'XXXXXXX',
        region: 'eu-fake-1',
      },
    },
  });
};
