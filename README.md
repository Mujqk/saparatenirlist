# Tools Hub

**Tools Hub** — минималистичный веб-каталог портативных системных утилит для Windows, анализа активности, поиска следов и проверки системы с готовой вкладкой **буферов обмена** для быстрого копирования поисковых запросов и фильтров.

Дизайн выполнен по визуальному стандарту **«Концепт 01»**: спокойная тёплая цветовая гамма, тонкие контуры вместо теней, компактные информативные карточки и высокая плотность данных.

Сайт полностью статичен, не требует сборки и зависимостей, и оптимизирован для публикации на **GitHub Pages** в репозитории [Mujqk/saparatenirlist](https://github.com/Mujqk/saparatenirlist).

---

## 🚀 Возможности

1. **Каталог из 17 утилит:**
   - **Everything** — мгновенный поиск файлов и папок на NTFS.
   - **Shellbag Analyzer** — анализ истории открывавшихся папок через Shellbags.
   - **UserAssistView** — запуск программ из ключей UserAssist в реестре.
   - **ExecutedProgramsList** — список ранее запускавшихся программ в системе.
   - **LastActivityView** — сводный журнал активности пользователя и событий Windows.
   - **JumpListsView** — просмотр списков переходов на панели задач.
   - **WinPrefetchView** — анализ Prefetch-файлов (.pf) и времени запуска.
   - **PreviousFilesRecovery** — поиск и восстановление файлов из теневых копий.
   - **Journal Trace** — чтение USN Journal для отслеживания изменений и удалений файлов.
   - **BrowsingHistoryView** — история посещений всех популярных браузеров.
   - **BrowserDownloadsView** — история загрузок файлов через браузеры.
   - **System Informer** — глубокий мониторинг процессов, сетевых соединений и памяти.
   - **Easy Cheat Detector** — проверка системы и памяти на наличие модификаций.
   - **Pafish64** — проверка окружения на наличие песочниц и отладчиков.
   - **Registry Finder** — быстрый поиск, замена и навигация по реестру.
   - **AppCrashView** — просмотр отчётов о падениях программ (WER).
   - **RegScanner** — быстрое сканирование реестра Windows с экспортом в `.reg`.

2. **Вкладка «Буферы обмена»:**
   - **Everything**: 3 отдельных буфера обмена (Буфер 1, Буфер 2, Буфер 3).
   - **Last Activity**: 1 буфер обмена.
   - **System Informer**: 3 буфера с индивидуальными названиями (`CS 2 / CS:GO`, `Браузеры`, `Steam`).
   - **RegScanner**: 1 буфер обмена.
   - Кнопка **«Копировать»** в один клик с визуальным подтверждением `Скопировано! ✓`.

3. **Мгновенное скачивание архива `programs.zip`:**
   - Кнопка скачивания на главной странице настроена на загрузку файла `programs.zip` из репозитория.

---

## 📝 Куда вставлять текст для буферов обмена?

Все тексты буферов обмена хранятся в отдельном файле:
```text
data/clipboards.json
```

### Как добавить свой текст:
1. Откройте файл `data/clipboards.json`.
2. Замените строки `// Вставьте сюда текст...` в поле `"content"` на ваши реальные поисковые запросы, фильтры или регулярные выражения:

```json
[
  {
    "appId": "everything",
    "appName": "Everything",
    "description": "Поисковые фильтры и строки запросов для Everything",
    "items": [
      {
        "id": "everything-1",
        "title": "Буфер 1",
        "content": "ext:exe;dll;bat path:\"C:\\Users\""
      },
      ...
    ]
  },
  {
    "appId": "systeminformer",
    "appName": "System Informer",
    "description": "Строки поиска и фильтры процессов в System Informer",
    "items": [
      {
        "id": "systeminformer-cs",
        "title": "CS 2 / CS:GO",
        "content": "cs2.exe | csgo.exe"
      },
      {
        "id": "systeminformer-browsers",
        "title": "Браузеры",
        "content": "chrome.exe | firefox.exe | msedge.exe | opera.exe"
      },
      {
        "id": "systeminformer-steam",
        "title": "Steam",
        "content": "steam.exe | steamwebhelper.exe"
      }
    ]
  }
]
```
3. Сохраните файл и закоммитьте в Git. Изменения сразу отобразятся на сайте!

---

## 📂 Структура проекта

```text
/
├── index.html              # Разметка каталога и буферов обмена
├── styles.css              # Дизайн-система (CSS Custom Properties)
├── script.js               # Поиск, фильтры, буферы обмена и переключение вкладок
├── assets/
│   ├── favicon.svg         # SVG-фавиконка проекта
│   └── icons/              # Векторные SVG-иконки для всех 17 утилит и интерфейса
├── data/
│   ├── programs.json       # Список программ и официальных ссылок
│   └── clipboards.json     # 💡 Тексты буферов обмена (редактировать здесь)
├── README.md               # Документация проекта
├── LICENSE                 # Лицензия MIT
└── .nojekyll               # Отключение Jekyll на GitHub Pages
```

---

## 💻 Локальный запуск

```bash
python3 -m http.server 8000
```
Затем откройте в браузере: `http://localhost:8000`

---

## 🌐 Публикация на GitHub Pages

1. Зафиксируйте файлы и отправьте в репозиторий [Mujqk/saparatenirlist](https://github.com/Mujqk/saparatenirlist):
   ```bash
   git add .
   git commit -m "Update Tools Hub: custom utilities, clipboards and programs.zip download"
   git push origin main
   ```
2. В настройках репозитория на GitHub перейдите в **Settings → Pages**.
3. В **Build and deployment → Source** выберите ветку `main` и папку `/ (root)`.
4. Сайт будет опубликован по адресу:
   `https://mujqk.github.io/saparatenirlist/`
