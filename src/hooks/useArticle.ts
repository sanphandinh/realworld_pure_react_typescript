import requester from 'utils/requester';
import { useQuery } from 'react-query';

const useArticle = (slug: string) => {
  return useQuery(`articles/${slug}`, requester, { retry: false });
};

export default useArticle;
