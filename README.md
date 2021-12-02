### Установка

1. Клонировать репозиторий:
   - `git clone http://git.int.kronshtadt.ru/center_m/frontend.git`;
2. Авторизоваться в реестре пакетов [Nexus](http://nexus.centr.m:8081/) под своим ником
   (авторизация происходит по файлу `.npmrc`):
   - `npm login --registry=http://nexus.centr.m:8081/repository/npm-registry/` - реестр прокси;
   - `npm login --registry=http://nexus.centr.m:8081/repository/npm-packages/` - временный реестр;
   - `npm login --registry=http://nexus.centr.m:8081/repository/kt-asu-gis-front/` - реестр общих решений АСУ ГИС;
4. Установить зависимости:
   - Установить Node.js и NPM версией взятой из `engines` в файле `package.json`;
   - `npm ci` - установить зависимости без изменения `package-lock.json`;
5. Настроить переменные окружения:
   - `cp .env .env.local` - клонировать файл с настройкой переменных окружения для режима разработки;
   - `cp .env.production .env.production.local` - клонировать файл с настройкой переменных окружения
     для сборки приложения;
   - Внести изменения в `.env.local` или `.env.production.local` на своё усмотрение;
6. Можно приступать к работе:
   - `npm run serve` - запустить приложение в режиме разработки;

### Команды

- `npm run serve` - запустить приложение в режиме разработки;
- `npm run build` - собрать статические файлы приложения для публикации на стенд;
- `npm run lint` - запустить линтер для поиска ошибок в коде;
- `npm run lint:fix` - запустить линтер для поиска и исправления ошибок в коде;
- `npm run codegen` - генерация TypeScript типов на базе GraphQL запросов, по конфигурации файла `codegen.yml`;

### Конфигурация веб-приложения

- Файл `.env` для команды `npm run serve`;
- Файл `.env.production` для команды `npm run build`;