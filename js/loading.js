const btnReload = document.querySelector('.btn__reload');
const btnIcon = document.querySelector('.btn__icon');

export function startLoading() {
  updateReloadBtn(false);
  btnIcon?.classList.add('btn__icon--rotating');
}

export function stopLoading() {
  btnIcon?.classList.remove('btn__icon--rotating');
  updateReloadBtn(true);
}

function updateReloadBtn(enabled) {
  if (!btnReload) return;
  if (Boolean(enabled)) {
    btnReload.removeAttribute('disabled');
  } else {
    btnReload.setAttribute('disabled', '');
  }
}
