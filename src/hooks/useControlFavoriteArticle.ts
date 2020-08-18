import { useCallback } from 'react';
import { useRequester } from 'providers/AuthProvider/hooks';
import { useMutation } from 'react-query';
import { MethodTypes } from 'utils/requester';
const useControlFavoriteArticle = (
  slug: string,
  favorited: boolean = false
) => {
  const requester = useRequester();
  const handler = useCallback(() => {
    const url = `articles/${slug}/favorite`;
    return requester(url, {
      method: favorited ? MethodTypes.DELETE : MethodTypes.POST,
    });
  }, [favorited, requester, slug]);
  return useMutation(handler);
};

export default useControlFavoriteArticle;
