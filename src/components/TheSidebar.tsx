import React, { FC } from 'react';
import useTags from '../hooks/useTags';
import BaseTagList from './BaseTagList';

interface IListTag {
  tags: string[];
}

const TheSidebar: FC = () => {
  const { data, status } = useTags();
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      {status === 'loading' && <div>loading...</div>}
      {data && <BaseTagList tagList={(data as IListTag).tags} />}
    </div>
  );
};

export default TheSidebar;
