import { FIELD_NAMES, PAGE_RECORDS_COUNT } from "./constants.js";

export function checkArray(arr) {
  return arr && Array.isArray(arr);
}

export function checkObject(obj) {
  return obj && typeof obj === 'object';
}

export function checkSort(fieldName) {
  return FIELD_NAMES.includes(fieldName?.trim());
}

export function getErrorByStatus(error) {
  if (!error) {
    return 'Невозможно прочесть информацию об ошибке';
  }

  switch (error.status) {
    case 400: return `Ошибка 400: Некорректный запрос`;
    case 403: return `Ошибка 403: Доступ запрещен`;
    case 404: return `Ошибка 404: Cтраница не найдена, проверьте правильность написания url-ссылки`;
    case 408: return `Ошибка 408: Истекло время ожидания`;
    case 500: return `Внутренняя ошибка сервера, попробуйте обновить страницу`;
    case 502: return `Ошибка 502: Ошибка шлюза`;
    case 502: return `Ошибка 503: Сервер временно недоступен`;
    default: return `Ошибка ${error.status}: ${error.statusText}`;
  }
}

export function getFirstRecordIndex(page) {
  const firstRecordIndex = (page - 1) * PAGE_RECORDS_COUNT;
  return Math.max(firstRecordIndex, 0);
}

export function getLastRecordIndex(page) {
  const lastRecordIndex = page * PAGE_RECORDS_COUNT - 1;
  return Math.max(lastRecordIndex, 0);
}
