import React, { FC } from 'react';
import BaseTag from './BaseTag';

type Props = {
  tagList: string[];
};

const BaseTagList: FC<Props> = ({ tagList }) => {
  return (
    <div className="tag-list">
      {tagList.map((item: string) => {
        return <BaseTag key={item} tag={item} />;
      })}
    </div>
  );
};

export default BaseTagList;
