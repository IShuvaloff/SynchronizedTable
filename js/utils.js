import { FIELD_NAMES } from "./constants.js";

export function checkArray(arr) {
  return arr && Array.isArray(arr) && arr.length;
}

export function checkObject(obj) {
  return obj && typeof obj === 'object';
}

export function checkSort(fieldName) {
  return FIELD_NAMES.includes(fieldName?.trim()); // && [-1, 0, 1].includes(direction);
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
