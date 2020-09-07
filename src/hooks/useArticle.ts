import requester from 'utils/requester';
import { useQuery } from 'react-query';
import IArticleResponse from 'models/ArticleResponse';

const useArticle = (slug: string) => {
  return useQuery<IArticleResponse, string>(`articles/${slug}`, requester, {
    retry: false,
  });
};

export default useArticle;
