import { FIELD_NAMES } from './constants.js';
import { checkArray, checkObject } from './utils.js';

const elementTable = document.getElementById('table-data');

export function updateTable(data) {
  if (!elementTable) return false;
  if (!checkArray(data)) return false;

  elementTable.innerHTML = '';

  data.forEach((item) => {
    const row = createRow(item);
    if (!row) return;
    elementTable.appendChild(row);
  });

  return true;
}

function createCell(text, fieldName) {
  const cell = document.createElement('td');
  cell.classList.add('cell', 'cell-body', 'table__cell', `cell-body--${fieldName}`);
  cell.textContent = text.trim();

  return cell;
}

function createRow(dataObj) {
  if (!checkObject(dataObj)) return '';
  const row = document.createElement('tr');
  row.classList.add('row', 'row-body', 'table__row');
  // row.tabIndex = '0';

  FIELD_NAMES.forEach((item) => {
    const field = dataObj[item];
    // if (!field) return;
    row.appendChild(createCell(String(field), item));
  });

  return row;
}
