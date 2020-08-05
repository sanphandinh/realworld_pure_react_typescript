import React from 'react';
import requester, { RequestConfigType } from 'utils/requester';
import useAuthState from './useAuthState';

const useRequester = <T>() => {
  const { user } = useAuthState();
  const token = user?.token;
  return React.useCallback(
    (endpoint: string, config?: RequestConfigType) =>
      requester<T>(endpoint, { ...config, token }),
    [token]
  );
};

export default useRequester;
