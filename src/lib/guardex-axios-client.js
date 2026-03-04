import axios from 'axios';

export function createAxiosClient({ baseURL, headers = {}, token, interceptResponses = false }) {
  const client = axios.create({
    baseURL,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  if (interceptResponses) {
    client.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error.response || error)
    );
  }

  return client;
}
