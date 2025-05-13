const API_BASE = process.env.REACT_APP_BACKEND_URL;

export const noAuthAPICall = async (path, method, body) => {
  const url = `${API_BASE}/${path}`;
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
  let url = `${API_BASE}/${path}`;

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
