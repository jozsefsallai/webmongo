const STORAGE_IS_ENCRYPTED = Symbol('STORAGE_IS_ENCRYPTED');

function get(key) {
  const target = localStorage.getItem(key);

  if (!target) {
    return {};
  }

  if (typeof target === 'string' && target.startsWith('enc+')) {
    return STORAGE_IS_ENCRYPTED;
  }

  try {
    const json = JSON.parse(target);
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function set(key, data, skipParsing = false) {
  if (skipParsing) {
    localStorage.setItem(key, data);
    return;
  }

  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
}

export {
  get,
  set,
  STORAGE_IS_ENCRYPTED
};
