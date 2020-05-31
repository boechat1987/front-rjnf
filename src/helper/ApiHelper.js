
const API_URL = process.env.API_URL;

export const doGet = (path) => {
  const url = `${API_URL}${path}`;
  return fetch(url).then((response) => response.json());
};
