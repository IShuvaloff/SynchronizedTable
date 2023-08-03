import { FIELD_NAMES } from "./constants.js";

export function checkArray(arr) {
  return arr && Array.isArray(arr) && arr.length;
}

export function checkObject(obj) {
  return obj && typeof obj === 'object';
}

export function checkSort(fieldName) {
  return FIELD_NAMES.includes(fieldName?.trim()); // && [-1, 0, 1].includes(direction);
}
