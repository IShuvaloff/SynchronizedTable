import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import { updatePagination } from './pagination.js';
import { updateTable } from './table.js';
import { getCurrentPage } from './pagination.js';

function reloadData(e) {
  e.preventDefault();
  loadData(saveData);
}

function openPagePrev(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === 1) return;

  const newPage = currentPage - 1;
  updateTable(dataLoaded.get(newPage));
  updatePagination(newPage, dataLoaded.getPagesCount());
}

function openPageNext(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === dataLoaded.getPagesCount()) return;

  const newPage = currentPage + 1;
  updateTable(dataLoaded.get(newPage));
  updatePagination(newPage, dataLoaded.getPagesCount());
}

function saveData(data) {
  const page = 1;

  // 1. сохранить данные
  dataLoaded.set(data);

  // 2. обновить таблицу
  updateTable(dataLoaded.get(page));

  // 3. обновить пагинацию
  updatePagination(page, dataLoaded.getPagesCount());
}

// ? обработчики событий
document.getElementById('reload-data').addEventListener('click', reloadData);
document.querySelector('.pagination__prev').addEventListener('click', openPagePrev);
document.querySelector('.pagination__next').addEventListener('click', openPageNext);

// ? загрузка данных
loadData(saveData);
