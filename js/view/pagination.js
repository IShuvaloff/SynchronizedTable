
const elementPagination = document.getElementById('pagination');

export function updatePagination(currentPage = 1, pagesCount = 1) {
  if (currentPage > pagesCount) return false;

  updateCurrentPage(currentPage);
  updatePagesCount(pagesCount);

  updatePagePrevBtn(currentPage > 1);
  updatePageNextBtn(currentPage < pagesCount);

  setPaginationVisible(pagesCount > 1);
}

export function getCurrentPage() {
  return +elementPagination.querySelector('.pagination__text--current').textContent;
}

function setPaginationVisible(visible) {
  if (Boolean(visible)) {
    elementPagination.classList.remove('hidden');
  } else {
    elementPagination.classList.add('hidden');
  }
}

function updateCurrentPage(num) {
  elementPagination.querySelector('.pagination__text--current').textContent = num;
}

function updatePagesCount(num) {
  elementPagination.querySelector('.pagination__text--count').textContent = num;
}

function updatePagePrevBtn(enabled) {
  const btn = elementPagination.querySelector('.pagination__prev');
  if (Boolean(enabled)) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', '');
  }
}

function updatePageNextBtn(enabled) {
  const btn = elementPagination.querySelector('.pagination__next');
  if (Boolean(enabled)) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', '');
  }
}
