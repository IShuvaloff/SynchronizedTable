import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import { updateTable } from './table.js';

function saveData(data) {
  // 1. сохранить данные
  dataLoaded.set(data);

  // 2. получить нужные данные
  const dataProcessed = dataLoaded.get(2);

  // 3. обновить таблицу
  updateTable(dataProcessed);
}

function reloadData(e) {
  e.preventDefault();
  loadData(saveData);
}
document.getElementById('reload-data').addEventListener('click', reloadData);

loadData(saveData);