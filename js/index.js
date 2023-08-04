import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import { updatePagination } from './view/pagination.js';
import { updateTable } from './view/table.js';
import { getCurrentPage } from './view/pagination.js';
import { updateTableHeader } from './view/sort.js';

function reloadData(e) {
  e.preventDefault();
  loadData({ doAfter: saveData });
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

function sort(e) {
  e.preventDefault();

  const id = e.currentTarget.dataset.id;
  if (!id) return;

  dataLoaded.sort(id, {
    doAfter: (sortData) => {
      const page = 1;
      updateTable(dataLoaded.get(page));
      updateTableHeader(sortData);
      updatePagination(page, dataLoaded.getPagesCount());
    }
  });
}

function saveData(data) {
  const page = 1;
  dataLoaded.set(data);
  updateTable(dataLoaded.get(page));
  updateTableHeader(dataLoaded.getSort());
  updatePagination(page, dataLoaded.getPagesCount());
}

// ? обработчики событий
document.getElementById('reload-data').addEventListener('click', reloadData);
document.querySelector('.pagination__prev').addEventListener('click', openPagePrev);
document.querySelector('.pagination__next').addEventListener('click', openPageNext);
document.querySelectorAll('.cell-header').forEach((item) => item.addEventListener('click', sort));

// ? загрузка данных
loadData({ doAfter: saveData });

