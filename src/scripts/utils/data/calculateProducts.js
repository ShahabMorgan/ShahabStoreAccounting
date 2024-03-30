export function calculateProduct(data, product, requesteQuant) {
  if (product.quantity - requesteQuant < 1) {
    data = data.filter((v) => {
      return v.id !== product.id;
    });
  } else {
    data.find((v) => {
      v.id === product.id
        ? (v.quantity = product.quantity - requesteQuant)
        : null;
    });
  }

  // save data
  localStorage.setItem("storageData", JSON.stringify(data));
}

export function checkProduct(product, requesteQuant) {
  if (product.quantity < requesteQuant) {
    return false;
  }
}
