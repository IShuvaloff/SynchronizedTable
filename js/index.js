import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import addEventListeners from './view/dom.js';
import updateView from './view/views.js';

function saveData(data) {
  dataLoaded.set(data);
  updateView(1);
}

// ? обработчики событий
addEventListeners({ onSaveData: saveData });

// ? загрузка данных
loadData({ doAfter: saveData });
