# Таблица с данными и запросы к серверу

Данный проект посвящен созданию таблицы с данными, извлекаемыми путем AJAX-запроса через библиотеку `axios` с сервера. Доступна фильтрация данных в таблице, сортировка по возрастанию/убыванию каждой из колонок, а также разбивка таблицы на несколько "страниц" с заранее заданным числом записей на страницу.

## Запуск

Для запуска достаточно запустить сервер через плагин `Go Live` в VSCode, либо с помощью любого сборщика Node.js (для этого требуется инициализировать новый проект).

### Особенности

1. Поскольку идет запрос на получение данных стороннего сервера, в силу CORS-ограничений обычный запуск index.html не позволит загрузить содержимое таблицы.