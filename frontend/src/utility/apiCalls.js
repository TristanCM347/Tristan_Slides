import config from '../config.json';

export const noAuthAPICall = async (path, method, body) => {
  const url = `http://localhost:${config.BACKEND_PORT}/${path}`;
  const response = await fetch(url, {
    method: `${method}`,
    headers: {
      'Content-type': 'application/json',
    },
    body
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

export const authAPICall = async (path, method, token, body = undefined, queryString = undefined) => {
  let url = `http://localhost:${config.BACKEND_PORT}/${path}`;

  if (queryString !== undefined) {
    url += `?${queryString}`;
  }

  const options = {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  };

  if (body !== undefined) {
    options.body = body;
  }

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};
