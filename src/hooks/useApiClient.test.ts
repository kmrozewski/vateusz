import {useApiClient} from './useApiClient';
import {renderHook} from '@testing-library/react';
import {Auth} from 'aws-amplify';

describe('useApiClient', () => {
  beforeEach(() => {
    // Set up JWT token mocks
    jest.mocked(Auth.currentSession).mockImplementation(
      jest.fn().mockResolvedValue({
        getIdToken: () => ({
          getJwtToken: () => 'some-jwt-id-token',
        }),
      })
    );
  });

  afterEach(() => jest.restoreAllMocks());

  it('correctly fulfills GET request', async () => {
    // given
    const {
      result: {
        current: {call},
      },
    } = renderHook(() => useApiClient());

    // when
    const response = await call({method: 'GET', endpoint: '/users'});

    // then
    expect(response.Items).toHaveLength(1);
    expect(response.Items[0].name).toEqual('Juan Pablo');
    expect(response.Items[0].identityId).toEqual('AA-2137');
  });

  it('correctly fulfills POST request', async () => {
    // given
    const {
      result: {
        current: {call},
      },
    } = renderHook(() => useApiClient());

    // when
    const body = JSON.stringify({identityId: 'AA-2137', name: 'Pablo'});
    const response = await call({method: 'POST', endpoint: '/users', body});
    const data = response.$metadata;

    // then
    expect(data.httpStatusCode).toEqual(200);
    expect(data.requestId).toEqual('SOME_REQUEST');
  });
});
