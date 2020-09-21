import { useCallback } from 'react';
import IArticleResponse from '../models/ArticleResponse';
import { useRequester } from 'providers/AuthProvider/hooks';
import { MutateOptions, MutationOptions, useMutation } from 'react-query';
import { MethodTypes } from 'utils/requester';
const useUpdateArticle = ({
  options,
}: {
  options?: MutationOptions<
    IArticleResponse,
    {
      slug?: string;
      data: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: Array<string>;
      };
    },
    Error,
    unknown
  >;
}) => {
  const requester = useRequester<IArticleResponse>();
  const mutationFn = useCallback<
    ({
      slug,
      data,
    }: {
      slug?: string;
      data: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: Array<string>;
      };
    }) => Promise<IArticleResponse>
  >(
    ({ slug, data }) => {
      const url = `articles${slug ? '/slug' : ''}`;
      return requester(url, {
        method: slug ? MethodTypes.PUT : MethodTypes.POST,
        body: data,
      });
    },
    [requester]
  );

  const [mutate, result] = useMutation<
    IArticleResponse,
    {
      slug?: string;
      data: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: Array<string>;
      };
    },
    Error,
    unknown
  >(mutationFn, options);

  const handleCreate = useCallback<
    (
      data: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: Array<string>;
      },
      options?:
        | MutateOptions<
            IArticleResponse,
            {
              slug?: string;
              data: {
                title?: string;
                description?: string;
                body?: string;
                tagList?: Array<string>;
              };
            },
            Error,
            unknown
          >
        | undefined
    ) => void
  >(
    (data, options) => {
      mutate({ data }, options);
    },
    [mutate]
  );

  const handleUpdate = useCallback<
    (
      data: {
        slug: string;
        title?: string;
        description?: string;
        body?: string;
        tagList?: Array<string>;
      },
      options?:
        | MutateOptions<
            IArticleResponse,
            {
              slug?: string;
              data: {
                title?: string;
                description?: string;
                body?: string;
                tagList?: Array<string>;
              };
            },
            Error,
            unknown
          >
        | undefined
    ) => void
  >(
    ({ slug, ...rest }, options) => {
      mutate({ data: rest, slug }, options);
    },
    [mutate]
  );
  return { result, handleCreate, handleUpdate };
};

export default useUpdateArticle;
