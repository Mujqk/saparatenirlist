# Каталог загрузок NirSoft Hub

В этой папке размещается архив с портативными утилитами NirSoft.

## Как добавить или обновить пакет утилит:

1. Соберите необходимый набор утилит NirSoft (или поместите подготовленный zip-архив).
2. Назовите файл:
   `nirsoft-package.zip`
3. Поместите его в эту папку (`downloads/nirsoft-package.zip`).
4. Зафиксируйте и отправьте изменения в Git:
   ```bash
   git add downloads/nirsoft-package.zip
   git commit -m "Update NirSoft package archive"
   git push
   ```

## Альтернатива через GitHub Releases:
Если размер архива превышает ограничения GitHub для обычных файлов (или чтобы не раздувать git-историю), создайте Release на GitHub, прикрепите `nirsoft-package.zip` к релизу и укажите прямую ссылку на скачивание из релиза в `index.html` или `script.js` (параметр `downloadUrl`).

## Текущий статус:
Главная кнопка сайта по умолчанию настроена на загрузку `./downloads/nirsoft-package.zip`. Если архив ещё не загружен в репозиторий, сайт предоставляет возможность перейти на официальный пакет **NirLauncher** (`https://launcher.nirsoft.net/`).
