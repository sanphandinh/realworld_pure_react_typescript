/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback } from 'react';
import classNames from 'helpers/className.helper';
import useQueryString from 'hooks/useQueryString';

type Props = {
  pageCount: number;
  totalItem: number;
  currentPage?: number;
};

const BasePaging: FC<Props> = ({ pageCount, totalItem, currentPage }) => {
  const [queryObj, updateQueryString] = useQueryString();
  const _currentPage = currentPage || queryObj?.page || '1';
  const numPage = Math.ceil(totalItem / pageCount);
  const paging = useCallback(
    (
      page: number
    ): ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) => (
      e
    ) => {
      updateQueryString({ page });
      e.preventDefault();
    },
    [updateQueryString]
  );
  if (numPage <= 1) return null;
  const arrayPage = new Array(numPage).fill(true);
  return (
    <nav>
      <ul className="pagination">
        {arrayPage.map((_, index: number) => (
          <li
            className={classNames('page-item', {
              active: _currentPage === index + 1 + '',
            })}
            key={index}>
            <a onClick={paging(index + 1)} href="#" className="page-link">
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BasePaging;
