import { getErrorByStatus } from "../utils.js";

const elementError = document.querySelector('.reloading__error');

export function clearError() {
  if (!elementError) return;
  elementError.innerHTML = '';
}

export function updateError(e, { doAfter }) {
  if (!elementError) return;

  clearError();

  if (e.name === 'ReferenceError') {
    elementError.textContent = `Ошибка ссылки на переменную: ${e.message}`;
  } else if (e.response) {
    elementError.textContent = getErrorByStatus(e.response);
  }

  if (doAfter) doAfter();
}
