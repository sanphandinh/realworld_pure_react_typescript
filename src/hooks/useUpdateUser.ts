import { MethodTypes } from './../utils/requester';
import { useCallback } from 'react';
import { useRequester } from 'providers/AuthProvider/hooks';
import IUserResponse from 'models/UserResponse';
import { MutationOptions, useMutation, MutateOptions } from 'react-query';

type DataType = {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
};

const useUpdateCurrentUser = (
  options: MutationOptions<
    IUserResponse,
    {
      email?: string;
      username?: string;
      password?: string;
      image?: string;
      bio?: string;
    },
    Error,
    unknown
  >
) => {
  const requester = useRequester<IUserResponse>();
  const mutationFn = useCallback<(data: DataType) => Promise<IUserResponse>>(
    (data) => {
      return requester('user', {
        method: MethodTypes.PUT,
        body: data,
      });
    },
    [requester]
  );
  const [mutate, result] = useMutation<IUserResponse, DataType, Error, unknown>(
    mutationFn,
    options
  );
  const updateCurrentUser = useCallback<
    (
      data: DataType,
      options?:
        | MutateOptions<IUserResponse, DataType, Error, unknown>
        | undefined
    ) => void
  >(
    async (data, options) => {
      mutate(data, options);
    },
    [mutate]
  );
  return { result, updateCurrentUser };
};

export default useUpdateCurrentUser;
