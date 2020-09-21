import React, { FC } from 'react';
import { Link } from '@reach/router';

type Props = {
  tag: string;
  notRedirect?: boolean;
};

const BaseTag: FC<Props> = ({ tag, notRedirect = false }) => {
  return (
    <Link
      to={notRedirect ? '' : `?tag=${tag}`}
      className="tag-pill tag-default">
      {tag}
    </Link>
  );
};

export default BaseTag;
