import { makeQueryRequest } from './../utils/requester';
import { useQuery } from 'react-query';
import IListArticle from 'models/ListArticle';
import useRequester from 'providers/AuthProvider/hooks/useRequester';

const useArticles = ({
  tag,
  author,
  favorited,
  limit,
  page = 1,
}: {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  page?: number;
}) => {
  const requester = useRequester<IListArticle>();
  const queryKey = makeQueryRequest('articles', {
    tag,
    author,
    favorited,
    limit,
    offset: Number(page) - 1,
  });
  const result = useQuery({
    queryKey,
    queryFn: requester,
  });
  return result;
};

export default useArticles;
