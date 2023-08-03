export function updateTableHeader(sortData) {
  const cellHeaderToSort = getHeaderCell(sortData.fieldName);
  const cellsHeaderSorted = getHeaderCellSorted();

  // очистка остальных посторонних столбцов от иконки сортировки
  cellsHeaderSorted?.forEach((cellHeaderSorted) => {
    if (cellHeaderSorted == cellHeaderToSort) return;
    clearCellSorted(cellHeaderSorted);
  });

  updateCellSorted(sortData);
}

function getHeaderCell(fieldName) {
  return document.querySelector(`.cell-header[data-id="${fieldName}"]`);
}

function getHeaderCellSorted() {
  return document.querySelectorAll('.cell-header[sorted]');
}

function setCellSortedIconVisible(cell, visible) {
  if (!cell) return;
  if (visible) {
    cell.setAttribute('sorted', '');
  } else {
    cell.removeAttribute('sorted');
  }
}

function updateCellSorted(sortData) {
  const cellHeader = getHeaderCell(sortData.fieldName);
  if (!cellHeader) return;

  const cell = cellHeader.querySelector(`.cell__icon`);
  if (!cell) return;

  cell.classList.remove('invisible');
  if (sortData.direction === -1) {
    cell.classList.add('cell__icon--reversed');
  } else {
    cell.classList.remove('cell__icon--reversed');
  }

  setCellSortedIconVisible(cellHeader, true);
}

function clearCellSorted(cellHeader) {
  setCellSortedIconVisible(cellHeader, false);

  const cellIcon = cellHeader.querySelector('.cell__icon');
  if (!cellIcon) return;

  cellIcon.classList.add('invisible');
  cellIcon.classList.remove('cell__icon--reversed');
}
