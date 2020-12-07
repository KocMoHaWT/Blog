export const _barriers = {};

const _executeHook = hook => hook();
const _registerHook = (id, hook) => {
  const existingHooks = _barriers[id] || [];
  _barriers[id] = [...existingHooks, hook];
  console.log('register',_barriers[id]);
};

export const raiseBarrier = id => {
  _barriers[id] = [];
  console.log('barrier rise',  _barriers[id]);
  return _barriers;
};
export const breakBarrier = id => {
  const hooks = _barriers[id] || [];
  console.log('barrier break',  _barriers[id]);
  hooks.forEach((hook) => {
    _executeHook(hook);
  });
  _barriers[id] = undefined;
};

export const barrier = (id) => {
  console.log('barrier start', id);
  return _barriers[id]
    ? new Promise(resolveMePls => _registerHook(id, resolveMePls))
    : Promise.resolve();
};
