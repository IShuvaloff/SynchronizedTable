import { checkArray, checkSort } from "./utils.js";
import { PAGE_RECORDS_COUNT } from './constants.js';

export let dataLoaded = {
  _records: [],

  set(data) {
    if (!checkArray(data)) return false;

    this.sortClear();
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
  },
  getCount() {
    return this._records.length;
  },

  getPagesCount() {
    return Math.ceil(this.getCount() / PAGE_RECORDS_COUNT);
  },

  _sort: {
    fieldName: '',
    direction: 0,
  },

  sort(fieldName, { doAfter }) {
    if (!checkSort(fieldName)) return;

    const fieldChanged = this._sort.fieldName !== fieldName;
    this._sort.fieldName = fieldName;

    if (fieldChanged) {
      this._sort.direction = 1;
    } else {
      switch (this._sort.direction) {
        case -1: this._sort.direction = 1; break;
        case 0: this._sort.direction = 1; break;
        case 1: this._sort.direction = -1; break;
        default: ;
      }
    }

    this._records.sort((a, b) => {
      let valueA, valueB;
      const reverse = this._sort.direction;

      switch (this._sort.fieldName) {
        case 'id':
          valueA = parseInt(a.id);
          valueB = parseInt(b.id);
          return reverse * ((valueA > valueB) - (valueB > valueA));
        default:
          valueA = String(a[fieldName]);
          valueB = String(b[fieldName]);
          return reverse * ((valueA.localeCompare(valueB)) - (valueB.localeCompare(valueA)));
      }
    })

    if (doAfter) doAfter(this._sort);
  },

  getSort() {
    return this._sort;
  },

  sortClear() {
    this._sort.fieldName = '';
    this._sort.direction = 0;
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
