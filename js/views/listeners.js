import { loadData } from "../api.js";
import { dataLoaded } from "../data.js";
import { getCurrentPage } from "./pagination.js";
import updateView from "./views.js";
import { setInfoVisible } from './info.js';
import { updateRowClicked } from "./table.js";

function reloadData(e) {
  e.preventDefault();
  loadData({ doAfter: saveData });
  setInfoVisible(false);
  updateRowClicked();
}

function openPagePrev(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === 1) return;

  updateView(currentPage - 1);
  // setInfoPanelVisible(false);
}

function openPageNext(e) {
  e.preventDefault();
  const currentPage = getCurrentPage();
  if (currentPage === dataLoaded.getPagesCount()) return;

  updateView(currentPage + 1);
  // setInfoPanelVisible(false);
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

let saveData;

export default function addEventListeners({ onSaveData }) {
  saveData = onSaveData;

  document.getElementById('reload-data').addEventListener('click', reloadData);
  document.querySelector('.pagination__prev').addEventListener('click', openPagePrev);
  document.querySelector('.pagination__next').addEventListener('click', openPageNext);
  document.querySelectorAll('.cell-header').forEach((item) => item.addEventListener('click', sort));
  document.querySelector('.filter').addEventListener('input', filter);
}
