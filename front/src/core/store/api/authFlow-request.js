import ax from './index';
import api from '../../shared/constans';

export const sendLoginData = (loginData) => {
  const url = api.schema + api.host + api.login;
  return ax.post(url, loginData);
};

export const sendRegisterData = (registerData) => {
  const url = api.schema + api.host + api.registration;
  return ax.post(url, registerData);
};

export const getNewToken = (refreshToken) => {
  const url = api.schema + api.host + api.newToken;
  return ax.post(url, { token: refreshToken });
};

export const getName = () => {
  const url = api.schema + api.host + api.name;
  return ax.get(url);
};
