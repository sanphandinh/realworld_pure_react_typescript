import React from 'react';
import { useQuery } from 'react-query';
import requester from 'utils/requester';
import IComment from 'models/Comment';
import TheCommentListItem from './TheCommentListItem';

type Props = {
  slug: string;
};

const TheCommentList: React.FC<Props> = ({ slug }) => {
  const { data = {}, status } = useQuery(
    `articles/${slug}/comments`,
    requester
  );
  const response = data as { comments: Array<IComment> };
  const comments = response?.comments;
  if (status === 'loading') return <div>Loading comment...</div>;
  if (status === 'error') return <div>Something went wrong!</div>;
  if (comments.length === 0) return null;
  return (
    <>
      {comments.map((item) => (
        <TheCommentListItem key={item.id} slug={slug} {...item} />
      ))}
    </>
  );
};

export default TheCommentList;
