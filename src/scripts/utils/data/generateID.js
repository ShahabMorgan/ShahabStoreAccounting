export function generateId(data, type) {
  let id;
  if (type) {
    let index = 1;
    id = type[0] + (110 + index);
    while (checkIds(data, id)) {
      index++;
      id = type[0] + (110 + index);
    }

    return id;
  } else {
    id = Math.floor(Math.random() * (100000 - 0) + 0);
    while (checkIds(data, id)) {
      id = Math.floor(Math.random() * (100000 - 0) + 0);
    }
    return id;
  }
}

function checkIds(data, id) {
  let result = false;
  data.forEach((v) => {
    if (v.id === id) {
      result = true;
    }
  });
  return result;
}
