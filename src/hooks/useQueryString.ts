import { useLocation, useNavigate } from '@reach/router';
import { useMemo, useCallback } from 'react';
import {
  getJSONFromQueryUrl,
  getQueryStringFromJSON,
} from 'helpers/route.helper';

interface IUpdateQueryStringFunc {
  (obj: { [id: string]: any }, isClearQueryString?: boolean): void;
}

const useQueryString: () => [
  { [id: string]: any },
  IUpdateQueryStringFunc
] = () => {
  const { search, origin } = useLocation();
  const navigate = useNavigate();
  const queryObj: { [id: string]: any } = useMemo(() => {
    return getJSONFromQueryUrl(search);
  }, [search]);

  const updateQueryString = useCallback<IUpdateQueryStringFunc>(
    (obj, isClearQueryString = false) => {
      if (isClearQueryString) {
        navigate(origin);
        return;
      }
      const newQueryObj = { ...queryObj, ...obj };
      const newQueryString = getQueryStringFromJSON(newQueryObj);
      navigate(`${origin}${newQueryString}`);
    },
    [navigate, origin, queryObj]
  );
  return [queryObj, updateQueryString];
};

export default useQueryString;
