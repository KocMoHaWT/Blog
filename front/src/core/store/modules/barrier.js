import {call, put} from "redux-saga/effects";
// eslint-disable-next-line import/no-cycle
import {getTokenViaRefresh} from "./auth";
import * as ap from "../api";

export const _barriers = {};

const _executeHook = hook => hook();
const _registerHook = (id, hook) => {
  const existingHooks = _barriers[id] || [];
  _barriers[id] = [...existingHooks, hook];
  console.log('register',_barriers[id]);
};

export const raiseBarrier = id => {
  if (!_barriers[id]) {
    _barriers[id] = [];
  }
  console.log('barrier rise',  _barriers[id]);
  return _barriers;
};
export const breakBarrier = id => {
  const hooks = _barriers[id] || [];
  console.log('barrier break',  _barriers[id]);
  hooks.forEach((hook) => {
    const token = localStorage.getItem('accessToken');
   ap.setAuthHeader(token);
    _executeHook(hook);
  });
  _barriers[id] = undefined;
};

export const barrier = (id) => {
  console.log('barrier check', id);
  return _barriers[id]
    ? new Promise(resolveMePls => _registerHook(id, resolveMePls))
    : Promise.resolve();
};

export const tokenBarrier = async function () {
  const value = await barrier('refresh-token');
  return value;
};

export const runRequest = function* (axiosRequest, ttl = 2) {
  if (ttl === 0) {
    throw Error;
  }
  try {
    yield call(tokenBarrier);
    const { data } = yield call(axiosRequest);
    return data;
  } catch (e) {
    if (!_barriers['refresh-token']) {
      yield put(getTokenViaRefresh());
    }
    return yield runRequest(axiosRequest, ttl - 1);
  }
};

