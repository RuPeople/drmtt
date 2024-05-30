# DRMTT

## Как поднять проект
1. Установить зависимости `pnpm install`
2. Запустить проект `pnpm start:dev`

## Команды
1. Запустить проект - `pnpm start`
1. Запустить проект вметсте с локальным дев бэкендом - `pnpm start:dev`
2. Поднять локальный дев бэкенд сервер - `pnpm start:dev:server`
3. Продакшн сборка - `pnpm run build:prod`
4. Дев сборка - `pnpm run build:dev`
5. Typescript линтер - `pnpm lint:ts`
6. Typescript линтер - пофиксить ошибки - `pnpm lint:ts:fix`
7. SCSS линтер - `pnpm lint:scss`
8. SCSS линтер - пофиксить ошибки - `pnpm lint:scss:fix`
9. Запустить unit тесты - `pnpm test:unit`
10. Запустить регрессионные тесты - `pnpm test:ui`
11. Сгенерировать отчёт по регрессионным тестам - `pnpm test:ui:report` (Посмотреть отчет - .loki/report.html)
12. Подтвердить изменения компонентов - `pnpm run test:ui:ok`
13. Поднять Storybook - `pnpm run storybook`