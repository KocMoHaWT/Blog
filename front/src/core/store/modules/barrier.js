const _barriers = {};

const _executeHook = hook => hook();
const _registerHook = (id, hook) => {
  const existingHooks = _barriers[id] || [];
  _barriers[id] = [...existingHooks, hook];
};

export const raiseBarrier = id => _barriers[id] = [];
export const breakBarrier = id => {
  const hooks = _barriers[id] || [];
  hooks.forEach(_executeHook);
  _barriers[id] = undefined;
};

export const barrier = id => _barriers[id]
  ? new Promise(resolveMePls => _registerHook(id, resolveMePls))
  : Promise.resolve();

