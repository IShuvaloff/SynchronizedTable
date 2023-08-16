import { loadData } from './api.js';
import { dataLoaded } from './data.js';
import addEventListeners from './views/listeners.js';
import updateView from './views/views.js';

function saveData(data) {
  dataLoaded.set(data);
  updateView(1);
}

// ? обработчики событий
addEventListeners({ onSaveData: saveData });

// ? загрузка данных
loadData({ doAfter: saveData });
