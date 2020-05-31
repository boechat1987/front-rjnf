
const API_URL = process.env.REACT_APP_API_URL;

export const doGet = (path) => {
  const url = `${API_URL}${path}`;
  return fetch(url).then((response) => response.json());
};
