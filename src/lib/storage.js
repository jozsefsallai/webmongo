function get(key) {
  const target = localStorage.getItem(key);

  if (!target) {
    return null;
  }

  try {
    const json = JSON.parse(target);
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function set(key, data) {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
}

export {
  get,
  set
};
