import { dataLoaded } from "../data.js";
import { updateRowClicked } from "./table.js";

export function setInfoVisible(visible) {
  if (visible) {
    document.querySelector('.info').classList.add('auto-height');
  } else {
    document.querySelector('.info').classList.remove('auto-height');
  }
}

function updateInfo(data) {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (typeof data[key] == 'object') {
        updateInfo(data[key]);
      } else {
        const infoRecord = document.querySelector(`.info__value--${key}`.toLocaleLowerCase());
        if (infoRecord) {
          infoRecord.innerHTML = data[key];
        }
      }
    }
  }
}

export function showInfo(e) {
  const cellId = this.querySelector('.cell-body--id');

  const id = parseInt(cellId.innerHTML);
  const person = dataLoaded.getById(id);
  if (!person) return;

  updateRowClicked(cellId.parentElement);
  setInfoVisible(true);
  updateInfo(person);
}
