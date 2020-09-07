import IArticleResponse from 'models/ArticleResponse';
import { MethodTypes } from 'utils/requester';
import useRequester from 'providers/AuthProvider/hooks/useRequester';
import { useMutation, MutateOptions, MutationOptions } from 'react-query';
import { useCallback } from 'react';

const useActionFavoriteArticle = ({
  slug,
  options,
}: {
  slug: string;
  options?: MutationOptions<
    IArticleResponse,
    { isDelete?: boolean },
    Error,
    unknown
  >;
}) => {
  const requester = useRequester<IArticleResponse>();
  const mutationFn = useCallback<
    ({ isDelete }: { isDelete?: boolean }) => Promise<IArticleResponse>
  >(
    ({ isDelete = false }) => {
      return requester(`articles/${slug}/favorite`, {
        method: isDelete ? MethodTypes.DELETE : MethodTypes.POST,
      });
    },
    [requester, slug]
  );
  const [mutate, result] = useMutation<
    IArticleResponse,
    { isDelete?: boolean },
    Error,
    unknown
  >(mutationFn, options);

  const handleDeleteFavorite = useCallback<
    (
      options?:
        | MutateOptions<
            IArticleResponse,
            { isDelete?: boolean },
            Error,
            unknown
          >
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
        | MutateOptions<
            IArticleResponse,
            { isDelete?: boolean },
            Error,
            unknown
          >
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
