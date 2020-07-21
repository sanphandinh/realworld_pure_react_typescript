import React from 'react';
import requester from 'utils/requester';
import useAuthState from './useAuthState';

const useRequester = () => {
  const { user } = useAuthState();
  const token = user?.token;
  return React.useCallback(
    (endpoint, config) => requester(endpoint, { ...config, token }),
    [token]
  );
};

export default useRequester;
