import React, { FC } from 'react';
import classNames from '../helpers/className.helper';

type Props = {
  active?: boolean;
  title: string | JSX.Element;
  url: string;
};

const TheHeaderNavItem: FC<Props> = ({ active = false, title, url }) => {
  return (
    <li className="nav-item">
      <a className={classNames('nav-link', { active: active })} href={url}>
        {title}
      </a>
    </li>
  );
};

export default TheHeaderNavItem;
