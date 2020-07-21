import { useQuery } from 'react-query';
import requester from 'utils/requester';

const useTags = () => {
  return useQuery({
    queryKey: 'tags',
    queryFn: () => requester('tags'),
  });
};

export default useTags;
