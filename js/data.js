import { checkArray } from "./utils.js";
import { PAGE_RECORDS_COUNT } from './constants.js';

export let dataLoaded = {
  _records: [],

  set(data) {
    if (!checkArray(data)) return false;

    this._records = data;
    return true;
  },

  get(page) {
    if (!page) return this._records; // если страниц нет
    
    let firstRecordIndex = getFirstRecordIndex(page);
    let lastRecordIndex = getLastRecordIndex(page)

    return this._records.filter((_value, index) => {
      return index >= firstRecordIndex && index <= lastRecordIndex;
    });
  }
}

function getFirstRecordIndex(page) {
  const firstRecordIndex = (page - 1) * PAGE_RECORDS_COUNT;
  return Math.max(firstRecordIndex, 0);
}

function getLastRecordIndex(page) {
  const lastRecordIndex = page * PAGE_RECORDS_COUNT - 1;
  return Math.max(lastRecordIndex, 0);
}