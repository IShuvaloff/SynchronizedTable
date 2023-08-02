export function checkArray(arr) {
  return arr && Array.isArray(arr) && arr.length;
}

export function checkObject(obj) {
  return obj && typeof obj === 'object';
}