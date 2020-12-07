import axios from 'axios';

const ax = axios.create();

export const setHeader = (key, value) => {
  ax.defaults.headers.common[key] = value;
};

export const setAuthHeader = (token) => {
  setHeader('Authorization', `Bearer ${token}`);
};

export default ax;


