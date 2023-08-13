import { checkArray, checkSort, getFirstRecordIndex, getLastRecordIndex } from "./utils.js";
import { PAGE_RECORDS_COUNT } from './constants.js';

export let dataLoaded = {
  _records: [],
  _recordsFiltered: [],

  setRecords(data) {
    this._records = data;
    this.updateRecords();
  },
  updateRecords() {
    this.updateFilter();
    this.updateSort();
  },

  set(data) {
    if (!checkArray(data)) return false;
    this.setRecords(data);
    return true;
  },

  get(page) {
    if (!page) return this._recordsFiltered; // если страниц нет

    let firstRecordIndex = getFirstRecordIndex(page);
    let lastRecordIndex = getLastRecordIndex(page)

    return this._recordsFiltered.filter((_value, index) => {
      return index >= firstRecordIndex && index <= lastRecordIndex;
    });
  },

  getCount() {
    return this._recordsFiltered.length;
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

    this.updateRecords();

    if (doAfter) doAfter(this._sort);
  },

  getSort() {
    return this._sort;
  },

  updateSort() {
    this._recordsFiltered.sort((a, b) => {
      let valueA, valueB;
      const reverse = this._sort.direction;

      switch (this._sort.fieldName) {
        case 'id':
          valueA = parseInt(a.id);
          valueB = parseInt(b.id);
          return reverse * ((valueA > valueB) - (valueB > valueA));
        default:
          valueA = String(a[this._sort.fieldName]);
          valueB = String(b[this._sort.fieldName]);
          return reverse * ((valueA.localeCompare(valueB)) - (valueB.localeCompare(valueA)));
      }
    });
  },

  _filter: '',

  getFilter() {
    return this._filter;
  },

  filter(text) {
    const newFilter = text?.trim()?.toLowerCase() ?? '';
    if (this._filter === newFilter) return false;

    this._filter = newFilter;
    this.updateRecords();

    return true;
  },

  updateFilter() {
    if (this._filter === '') {
      this._recordsFiltered = this._records;
    } else {
      this._recordsFiltered = this._records.filter((value) => {
        return value.firstName.trim().toLowerCase().includes(this._filter) ||
          value.lastName.trim().toLowerCase().includes(this._filter) ||
          String(value.id).trim().toLowerCase().includes(this._filter) ||
          value.phone.trim().toLowerCase().includes(this._filter) ||
          value.email.trim().toLowerCase().includes(this._filter);
      });
    }
  },
}
