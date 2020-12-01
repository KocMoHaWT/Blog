import { all, put, call, takeLatest } from 'redux-saga/effects';
import history from '../../../history';
import {getName, getNewToken, sendLoginData, sendRegisterData} from "../api/authFlow-request";
import {barrier, breakBarrier, raiseBarrier} from "./barrier";

const LOGIN = '[auth flow] log in action';
const LOGIN_SUCCESS = '[auth flow] log in action success';
const LOGIN_FAILURE = '[auth flow] log in action failure';

const SET_LOGGED_IN_STATE = '[auth flow] set logged in state';

const LOGOUT = '[auth flow] logout action';

const REGISTER = '[auth flow] register user';
const REGISTER_SUCCESS = '[auth flow] register user success';
const REGISTER_FAILURE = '[auth flow] register user failure';

const GET_NAME = '[auth flow] get name';
const GET_NAME_SUCCESS = '[auth flow] get name success';
const GET_NAME_FAILURE = '[auth flow] get name failure';

const GET_TOKEN_VIA_REFRESH = '[auth flow] get token via refresh';
const GET_TOKEN_VIA_REFRESH_SUCCESS = '[auth flow] get token via refresh success';
const GET_TOKEN_VIA_REFRESH_FAILURE = '[auth flow] get token via refresh failure';



export const loginAct = (loginData) => {
 return {
   type: LOGIN,
   loginData,
 };
};

export const loginSuccessAct = () => ({ type: LOGIN_SUCCESS });
export const loginFailureAct = () => ({ type: LOGIN_FAILURE });

export const registerAct = (registerData) => {
  return {
    type: REGISTER,
    registerData,
  };
};

export const setLoggedState = (isLogged) => {
  return {
    type: SET_LOGGED_IN_STATE,
    isLoggedIn: isLogged
  };
};

export const registerSuccessAct = () => ({ type: REGISTER_SUCCESS });
export const registerFailureAct = () => ({ type: REGISTER_FAILURE });

export const logOutAct = () => ({ type: LOGOUT });

export const getNameAct = () => ({ type: GET_NAME });
export const getNameSuccessAct = ({ name }) => {
  return {
    type: GET_NAME_SUCCESS,
    name,
  };
};
export const getNameFailureAct = () => ({ type: GET_NAME_FAILURE });

export const getTokenViaRefresh = () => ({ type: GET_TOKEN_VIA_REFRESH });
export const getTokenViaRefreshSuccess = () => ({ type: GET_TOKEN_VIA_REFRESH_SUCCESS });
export const getTokenViaRefreshFailure = () => ({ type: GET_TOKEN_VIA_REFRESH_FAILURE });

/// reducer 

const initalState = {
  name: '',
  isLoggedIn: false,
};

export default function authReducer(state = initalState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case SET_LOGGED_IN_STATE: {
      const { isLoggedIn } = action;
      return { ...state, isLoggedIn };
    }
    default: {
      return { ...state };
    }
  }
}

// sagas

export function* watchLogInAct(loginData) {
  try {
    const { data } = yield call(sendLoginData, loginData);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    yield put(loginSuccessAct());
    yield call(history.push, '/');
  } catch (error) {
    yield put(loginFailureAct());
  }
}

function* watchGetName() {
    try {
      yield barrier('refresh-token');
      const { data } = yield call(getName);
      yield put(getNameSuccessAct(data));
    } catch (e) {
      yield put(getNameFailureAct());
    }
}

function* watchLogout() {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      yield history.push('/login');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
}

function* watchGetRegistration(registerData) {
    try {
      yield call(sendRegisterData, registerData);
      yield put(registerSuccessAct());
      yield call(history.push, '/login');
    } catch (e) {
      yield put(registerFailureAct());
    }
}

function* watchGetTokenWithRefresh() {
  try {
    yield raiseBarrier('refresh-token');
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
     throw new Error('invalid token');
    }
    const { data } = yield call(getNewToken, refresh);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    yield breakBarrier('refresh-token');
    yield put(getTokenViaRefreshSuccess());
  } catch (e) {
    yield call(history.push, '/login');
    yield put(getTokenViaRefreshFailure());
  }
}

export function* authRootSaga() {
  yield all([
    takeLatest(LOGIN, watchLogInAct),
    takeLatest(LOGOUT, watchLogout),
    takeLatest(GET_NAME, watchGetName),
    takeLatest(REGISTER, watchGetRegistration),
    takeLatest(GET_TOKEN_VIA_REFRESH, watchGetTokenWithRefresh)
  ]);
}
