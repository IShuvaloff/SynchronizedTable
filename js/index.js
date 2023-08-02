import { loadData } from './api.js';
import { dataLoaded } from './data.js';

function saveData(data) {
  // 1. сохранить данные
  dataLoaded.set(data);

  // 2. 
}

loadData(saveData);