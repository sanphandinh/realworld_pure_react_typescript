import { MethodTypes } from 'utils/requester';
import useRequester from 'providers/AuthProvider/hooks/useRequester';
import { useMutation, MutateOptions, MutationOptions } from 'react-query';
import { useCallback } from 'react';
import IArticle from 'models/Article';

type ResponseType = {
  article: IArticle;
};

const useActionFavoriteArticle = ({
  slug,
  options,
}: {
  slug: string;
  options?: MutationOptions<
    ResponseType,
    { isDelete?: boolean },
    Error,
    unknown
  >;
}) => {
  const requester = useRequester<ResponseType>();
  const mutationFn = useCallback<
    ({ isDelete }: { isDelete?: boolean }) => Promise<ResponseType>
  >(
    ({ isDelete = false }) => {
      return requester(`articles/${slug}/favorite`, {
        method: isDelete ? MethodTypes.DELETE : MethodTypes.POST,
      });
    },
    [requester, slug]
  );
  const [mutate, result] = useMutation<
    ResponseType,
    { isDelete?: boolean },
    Error,
    unknown
  >(mutationFn, options);

  const handleDeleteFavorite = useCallback<
    (
      options?:
        | MutateOptions<ResponseType, { isDelete?: boolean }, Error, unknown>
        | undefined
    ) => void
  >(
    (options) => {
      mutate({ isDelete: true }, options);
    },
    [mutate]
  );

  const handleFavorite = useCallback<
    (
      options?:
        | MutateOptions<ResponseType, { isDelete?: boolean }, Error, unknown>
        | undefined
    ) => void
  >(
    (options) => {
      mutate({ isDelete: false }, options);
    },
    [mutate]
  );

  return { result, handleFavorite, handleDeleteFavorite };
};

export default useActionFavoriteArticle;
