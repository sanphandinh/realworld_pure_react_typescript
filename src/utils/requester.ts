export enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const BaseUrl: string = process.env.REACT_APP_API_URL || '';

async function requester<T>(
  endpoint: string,
  requestConfig?: {
    method?: MethodTypes;
    body?: { [id: string]: any };
    headers?: { [id: string]: any };
    token?: string;
    [id: string]: any;
  }
): Promise<T> {
  const { method, body, headers: customHeaders, token, ...customConfig } =
    requestConfig || {};
  const headers: { [id: string]: any } = {};
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  if (body) {
    headers['Content-Type'] = 'application/json';
  }
  const config = {
    method: method || body ? MethodTypes.POST : MethodTypes.GET,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
      ...customHeaders,
    },
    ...customConfig,
  };
  return window
    .fetch(`${BaseUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // Handle for unauthenticate
        //implement logout here

        //Refresh page
        window.location.reload(true);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else return Promise.reject(data);
    });
}

export default requester;
