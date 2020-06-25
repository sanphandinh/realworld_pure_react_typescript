import React, { FC } from 'react';
import classNames from '../helpers/className.helper';
import { Link } from '@reach/router';

type Props = {
  title: string | JSX.Element;
  url: string;
};

const TheHeaderNavItem: FC<Props> = ({ title, url }) => {
  return (
    <li className="nav-item">
      <Link
        to={url}
        getProps={({ isCurrent }) => {
          return {
            className: classNames('nav-link', { active: isCurrent }),
          };
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default TheHeaderNavItem;
