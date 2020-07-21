import React, { FC } from 'react';
import { Link } from '@reach/router';

type Props = {
  tag: string;
};

const BaseTag: FC<Props> = ({ tag }) => {
  return (
    <Link to="" className="tag-pill tag-default">
      {tag}
    </Link>
  );
};

export default BaseTag;
