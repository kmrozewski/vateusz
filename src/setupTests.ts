// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {Amplify} from 'aws-amplify';

// Fixes issues import 'useAuthenticator' from aws-amplify outputs "TypeError: window.URL.createObjectURL is not a function" when jest testing
// https://stackoverflow.com/a/74063955/2933843
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

// Global mock for Amplify
jest.mock('aws-amplify');

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

process.env = Object.assign(process.env, {
  REACT_APP_API_URL: 'https://example.com',
});
