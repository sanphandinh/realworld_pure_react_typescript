const fillParam2Url = (str: string, paramObj: { [id: string]: string }) => {
  return Object.keys(paramObj).reduce(
    (prevValue: string, currentValue: string) => {
      return prevValue.replace(`:${currentValue}`, paramObj[currentValue]);
    },
    str
  );
};

const getJSONFromQueryUrl = (search: string): { [id: string]: any } => {
  if (!search) return {};
  const result: { [id: string]: string } = {};
  const queryString: string = search.slice(1);
  const pairs = queryString.split('&');
  pairs.forEach((pair) => {
    const keyValue: string[] = pair.split('=');
    result[keyValue[0]] = decodeURIComponent(keyValue[1] || '');
  });
  return JSON.parse(JSON.stringify(result));
};

const getQueryStringFromJSON = (queryObj: { [id: string]: any }): string => {
  let result = '';
  for (const key in queryObj) {
    if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
      const element = queryObj[key];
      //Break if element is undefined or null
      if (element === undefined || element === null) continue;
      result += `${key}=${encodeURIComponent(element)}`;
    }
  }
  if (result.length) return `?${result}`;
  return result;
};

export { fillParam2Url, getJSONFromQueryUrl, getQueryStringFromJSON };
