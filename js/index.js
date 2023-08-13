import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import { getCurrentPage } from './view/pagination.js';
import updateView from './view/views.js';

function reloadData(e) {
  e.preventDefault();
  loadData({ doAfter: saveData });
}

function openPagePrev(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === 1) return;

  updateView(currentPage - 1);
}

function openPageNext(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === dataLoaded.getPagesCount()) return;

  updateView(currentPage + 1);
}

function sort(e) {
  e.preventDefault();

  const id = e.currentTarget.dataset.id;
  if (!id) return;

  dataLoaded.sort(id, {doAfter: () => updateView(1)});
}

function filter(e) {
  e.preventDefault();
  dataLoaded.filter(this.value);
  updateView(1);
}

function saveData(data) {
  dataLoaded.set(data);
  updateView(1);
}

// ? обработчики событий
document.getElementById('reload-data').addEventListener('click', reloadData);
document.querySelector('.pagination__prev').addEventListener('click', openPagePrev);
document.querySelector('.pagination__next').addEventListener('click', openPageNext);
document.querySelectorAll('.cell-header').forEach((item) => item.addEventListener('click', sort));
document.querySelector('.filter').addEventListener('input', filter);

// ? загрузка данных
loadData({ doAfter: saveData });
