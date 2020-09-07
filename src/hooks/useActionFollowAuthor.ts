import { MethodTypes } from 'utils/requester';
import useRequester from 'providers/AuthProvider/hooks/useRequester';
import { useMutation, MutateOptions, MutationOptions } from 'react-query';
import { useCallback } from 'react';
import IProfileResponse from '../models/ProfileResponse';

const useActionFollowAuthor = ({
  username,
  options,
}: {
  username: string;
  options?: MutationOptions<
    IProfileResponse,
    { isUnfollow?: boolean },
    Error,
    unknown
  >;
}) => {
  const requester = useRequester<IProfileResponse>();
  const mutationFn = useCallback<
    ({ isUnfollow }: { isUnfollow?: boolean }) => Promise<IProfileResponse>
  >(
    ({ isUnfollow = false }) => {
      return requester(`profiles/${username}/follow`, {
        method: isUnfollow ? MethodTypes.DELETE : MethodTypes.POST,
      });
    },
    [requester, username]
  );
  const [mutate, result] = useMutation<
    IProfileResponse,
    { isUnfollow?: boolean },
    Error,
    unknown
  >(mutationFn, options);

  const handleUnfollow = useCallback<
    (
      options?:
        | MutateOptions<
            IProfileResponse,
            { isUnfollow?: boolean },
            Error,
            unknown
          >
        | undefined
    ) => void
  >(
    (options) => {
      mutate({ isUnfollow: true }, options);
    },
    [mutate]
  );

  const handleFollow = useCallback<
    (
      options?:
        | MutateOptions<
            IProfileResponse,
            { isUnfollow?: boolean },
            Error,
            unknown
          >
        | undefined
    ) => void
  >(
    (options) => {
      mutate({ isUnfollow: false }, options);
    },
    [mutate]
  );

  return { result, handleFollow, handleUnfollow };
};

export default useActionFollowAuthor;
