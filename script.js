/**
 * Tools Hub — Скрипт каталога утилит и буферов обмена
 * Работает без сторонних библиотек и сборки
 */

(function () {
  'use strict';

  // Встроенный резервный набор данных утилит (на случай блокировки fetch в file://)
  const FALLBACK_PROGRAMS = [
    {
      "id": "everything",
      "name": "Everything",
      "category": "Файлы",
      "description": "Мгновенный поиск файлов и папок по имени на NTFS-накопителях.",
      "officialUrl": "https://www.voidtools.com/ru-ru/",
      "icon": "assets/icons/everything.svg",
      "featured": true
    },
    {
      "id": "shellbag-analyzer",
      "name": "Shellbag Analyzer",
      "category": "Активность",
      "description": "Анализ записей Shellbag для просмотра истории открывавшихся папок.",
      "officialUrl": "https://privazer.com/en/download-shellbag-analyzer-shellbag-cleaner.php",
      "icon": "assets/icons/shellbag.svg",
      "featured": true
    },
    {
      "id": "userassistview",
      "name": "UserAssistView",
      "category": "Активность",
      "description": "Отображение информации о запуске приложений из реестра UserAssist.",
      "officialUrl": "https://www.nirsoft.net/utils/userassist_view.html",
      "icon": "assets/icons/userassist.svg",
      "featured": true
    },
    {
      "id": "executedprogramslist",
      "name": "ExecutedProgramsList",
      "category": "Активность",
      "description": "Список ранее запускавшихся программ и исполняемых файлов в системе.",
      "officialUrl": "https://www.nirsoft.net/utils/executed_programs_list.html",
      "icon": "assets/icons/executedprograms.svg",
      "featured": true
    },
    {
      "id": "lastactivityview",
      "name": "LastActivityView",
      "category": "Активность",
      "description": "Журнал последней активности пользователя и системных событий Windows.",
      "officialUrl": "https://www.nirsoft.net/utils/computer_activity_view.html",
      "icon": "assets/icons/lastactivity.svg",
      "featured": true
    },
    {
      "id": "jumplistsview",
      "name": "JumpListsView",
      "category": "Активность",
      "description": "Просмотр записей списков переходов (Jump Lists) панели задач.",
      "officialUrl": "https://www.nirsoft.net/utils/jump_lists_view.html",
      "icon": "assets/icons/jumplists.svg",
      "featured": false
    },
    {
      "id": "winprefetchview",
      "name": "WinPrefetchView",
      "category": "Система",
      "description": "Анализ файлов Prefetch (.pf) для проверки времени запуска программ.",
      "officialUrl": "https://www.nirsoft.net/utils/win_prefetch_view.html",
      "icon": "assets/icons/winprefetch.svg",
      "featured": false
    },
    {
      "id": "previousfilesrecovery",
      "name": "PreviousFilesRecovery",
      "category": "Файлы",
      "description": "Поиск и восстановление предыдущих версий файлов из теневых копий тома.",
      "officialUrl": "https://www.nirsoft.net/utils/previous_files_recovery.html",
      "icon": "assets/icons/previousfiles.svg",
      "featured": false
    },
    {
      "id": "journaltrace",
      "name": "Journal Trace",
      "category": "Активность",
      "description": "Анализ журнала USN Journal для отслеживания изменений и удалений файлов.",
      "officialUrl": "https://github.com/ponei/JournalTrace/releases",
      "icon": "assets/icons/journaltrace.svg",
      "featured": false
    },
    {
      "id": "browsinghistoryview",
      "name": "BrowsingHistoryView",
      "category": "Активность",
      "description": "Просмотр сводной истории посещений веб-страниц во всех браузерах.",
      "officialUrl": "https://www.nirsoft.net/utils/browsing_history_view.html",
      "icon": "assets/icons/browsinghistory.svg",
      "featured": false
    },
    {
      "id": "browserdownloadsview",
      "name": "BrowserDownloadsView",
      "category": "Активность",
      "description": "Отображение истории загрузок файлов через различные веб-браузеры.",
      "officialUrl": "https://www.nirsoft.net/utils/web_browser_downloads_view.html",
      "icon": "assets/icons/browserdownloads.svg",
      "featured": false
    },
    {
      "id": "systeminformer",
      "name": "System Informer",
      "category": "Система",
      "description": "Продвинутый мониторинг процессов, сетевых соединений и памяти.",
      "officialUrl": "https://systeminformer.io/",
      "icon": "assets/icons/systeminformer.svg",
      "featured": true
    },
    {
      "id": "easycheatdetector",
      "name": "Easy Cheat Detector",
      "category": "Система",
      "description": "Инструмент проверки системы и памяти на наличие сторонних модификаций.",
      "officialUrl": "https://fungun.top/ecd/",
      "icon": "assets/icons/easycheatdetector.svg",
      "featured": true
    },
    {
      "id": "pafish64",
      "name": "Pafish64",
      "category": "Система",
      "description": "Проверка системы на наличие сред отладки, песочниц и хуков.",
      "officialUrl": "https://github.com/a0rtega/pafish/releases/tag/v0.6",
      "icon": "assets/icons/pafish.svg",
      "featured": false
    },
    {
      "id": "registryfinder",
      "name": "Registry Finder",
      "category": "Реестр",
      "description": "Быстрый поиск, замена и удобная навигация по ключам реестра Windows.",
      "officialUrl": "https://registry-finder.com/",
      "icon": "assets/icons/registryfinder.svg",
      "featured": false
    },
    {
      "id": "appcrashview",
      "name": "AppCrashView",
      "category": "Система",
      "description": "Просмотр отчётов о сбоях и аварийных завершениях программ Windows.",
      "officialUrl": "https://www.nirsoft.net/utils/app_crash_view.html",
      "icon": "assets/icons/appcrashview.svg",
      "featured": false
    },
    {
      "id": "regscanner",
      "name": "RegScanner",
      "category": "Реестр",
      "description": "Сканирование реестра Windows с экспортом найденных значений в .reg.",
      "officialUrl": "https://www.nirsoft.net/utils/regscanner.html",
      "icon": "assets/icons/regscanner.svg",
      "featured": false
    }
  ];

  // Встроенный резервный набор буферов обмена
  const FALLBACK_CLIPBOARDS = [
    {
      "appId": "everything",
      "appName": "Everything",
      "description": "Поисковые фильтры и строки запросов для Everything",
      "items": [
        {
          "id": "everything-1",
          "title": "Буфер 1",
          "content": "// Вставьте сюда текст для первого буфера Everything"
        },
        {
          "id": "everything-2",
          "title": "Буфер 2",
          "content": "// Вставьте сюда текст для второго буфера Everything"
        },
        {
          "id": "everything-3",
          "title": "Буфер 3",
          "content": "// Вставьте сюда текст для третьего буфера Everything"
        }
      ]
    },
    {
      "appId": "lastactivity",
      "appName": "Last Activity",
      "description": "Строка фильтрации событий для LastActivityView",
      "items": [
        {
          "id": "lastactivity-1",
          "title": "Буфер 1",
          "content": "// Вставьте сюда текст для Last Activity"
        }
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
          "content": "// Вставьте сюда текст для CS 2 / CS:GO"
        },
        {
          "id": "systeminformer-browsers",
          "title": "Браузеры",
          "content": "// Вставьте сюда текст для Браузеров"
        },
        {
          "id": "systeminformer-steam",
          "title": "Steam",
          "content": "// Вставьте сюда текст для Steam"
        }
      ]
    },
    {
      "appId": "regscanner",
      "appName": "RegScanner",
      "description": "Поисковый запрос по ключам реестра для RegScanner",
      "items": [
        {
          "id": "regscanner-1",
          "title": "Буфер 1",
          "content": "// Вставьте сюда текст для RegScanner"
        }
      ]
    }
  ];

  // Состояние приложения
  let programsData = [];
  let clipboardsData = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let activeTab = 'catalog';

  // DOM-элементы
  const cardsContainer = document.getElementById('cards-container');
  const emptyState = document.getElementById('empty-state');
  const catalogCount = document.getElementById('catalog-count');
  const catalogTitle = document.getElementById('catalog-title');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const categoryPills = document.querySelectorAll('.category-pill');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const clipboardsContainer = document.getElementById('clipboards-container');

  // Вкладки
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewCatalog = document.getElementById('view-catalog');
  const viewClipboards = document.getElementById('view-clipboards');

  // Модальное окно
  const aboutDialog = document.getElementById('about-dialog');
  const openAboutBtn = document.getElementById('open-about-btn');
  const closeAboutBtn = document.getElementById('close-about-btn');
  const confirmAboutBtn = document.getElementById('confirm-about-btn');

  /**
   * Экранирование HTML
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Загрузка данных каталога и буферов обмена
   */
  async function loadData() {
    // 1. Программы
    try {
      const resp = await fetch('data/programs.json');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      programsData = await resp.json();
    } catch (e) {
      programsData = FALLBACK_PROGRAMS;
    }

    // 2. Буферы обмена
    try {
      const resp = await fetch('data/clipboards.json');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      clipboardsData = await resp.json();
    } catch (e) {
      clipboardsData = FALLBACK_CLIPBOARDS;
    }

    renderCatalog();
    renderClipboards();
  }

  /**
   * Переключение активной вкладки
   */
  function switchTab(tabName) {
    activeTab = tabName;

    navTabs.forEach(function (tab) {
      const isCurrent = tab.getAttribute('data-tab') === tabName;
      tab.classList.toggle('active', isCurrent);
      tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    if (tabName === 'clipboards') {
      viewCatalog.hidden = true;
      viewClipboards.hidden = false;
      window.location.hash = 'clipboards';
    } else {
      viewCatalog.hidden = false;
      viewClipboards.hidden = true;
      window.location.hash = 'catalog';
    }
  }

  /**
   * Фильтрация программ каталога
   */
  function getFilteredPrograms() {
    const query = searchQuery.trim().toLowerCase();

    return programsData.filter(function (item) {
      const matchesCategory = (currentCategory === 'all') || (item.category === currentCategory);

      let matchesSearch = true;
      if (query) {
        const inName = item.name.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inCat = item.category.toLowerCase().includes(query);
        matchesSearch = inName || inDesc || inCat;
      }

      return matchesCategory && matchesSearch;
    });
  }

  /**
   * Рендер каталога утилит
   */
  function renderCatalog() {
    const filtered = getFilteredPrograms();

    if (filtered.length === 0) {
      cardsContainer.innerHTML = '';
      cardsContainer.hidden = true;
      emptyState.hidden = false;
      catalogCount.textContent = '0 программ';
      return;
    }

    cardsContainer.hidden = false;
    emptyState.hidden = true;

    if (searchQuery.trim()) {
      catalogTitle.textContent = 'Результаты поиска';
    } else if (currentCategory !== 'all') {
      catalogTitle.textContent = 'Категория: ' + currentCategory;
    } else {
      catalogTitle.textContent = 'Список утилит';
    }
    catalogCount.textContent = filtered.length + ' ' + getPluralPrograms(filtered.length);

    const fragment = document.createDocumentFragment();

    filtered.forEach(function (prog) {
      const card = document.createElement('article');
      card.className = 'utility-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');

      card.innerHTML = `
        <div class="card-left">
          <div class="card-icon-wrap" aria-hidden="true">
            <img src="${escapeHtml(prog.icon)}" alt="" class="card-icon" loading="lazy" width="20" height="20">
          </div>
          <div class="card-info">
            <div class="card-title-row">
              <span class="card-name">${escapeHtml(prog.name)}</span>
              <span class="card-badge">${escapeHtml(prog.category)}</span>
            </div>
            <p class="card-desc">${escapeHtml(prog.description)}</p>
          </div>
        </div>
        <div class="card-right">
          <a
            href="${escapeHtml(prog.officialUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="card-link"
            aria-label="Официальная страница ${escapeHtml(prog.name)} (откроется в новой вкладке)"
          >
            <span>Официальная страница</span>
            <svg class="card-link-icon" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 1.5h6.5V8"/>
              <path d="M10.5 1.5L2.5 9.5"/>
            </svg>
          </a>
        </div>
      `;

      fragment.appendChild(card);
    });

    cardsContainer.innerHTML = '';
    cardsContainer.appendChild(fragment);
  }

  /**
   * Рендер буферов обмена
   */
  function renderClipboards() {
    if (!clipboardsContainer) return;

    const fragment = document.createDocumentFragment();

    clipboardsData.forEach(function (group) {
      const groupEl = document.createElement('div');
      groupEl.className = 'clipboard-group';

      let itemsHtml = '';
      group.items.forEach(function (item) {
        itemsHtml += `
          <div class="clipboard-card">
            <div class="clipboard-card-header">
              <span class="clipboard-card-label">${escapeHtml(item.title)}</span>
              <button
                type="button"
                class="btn-copy"
                data-text="${escapeHtml(item.content)}"
                aria-label="Скопировать ${escapeHtml(item.title)}"
              >
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                  <path d="M10.5 5.5V3.5a1.5 1.5 0 0 0-1.5-1.5H3.5a1.5 1.5 0 0 0-1.5 1.5V9a1.5 1.5 0 0 0 1.5 1.5h2" />
                </svg>
                <span>Копировать</span>
              </button>
            </div>
            <pre class="clipboard-content-box">${escapeHtml(item.content)}</pre>
          </div>
        `;
      });

      groupEl.innerHTML = `
        <div class="clipboard-group-header">
          <div class="clipboard-group-title">
            <span>${escapeHtml(group.appName)}</span>
          </div>
          <span class="clipboard-group-desc">${escapeHtml(group.description)}</span>
        </div>
        <div class="clipboard-cards-grid">
          ${itemsHtml}
        </div>
      `;

      fragment.appendChild(groupEl);
    });

    clipboardsContainer.innerHTML = '';
    clipboardsContainer.appendChild(fragment);

    // Подключение кнопок копирования
    clipboardsContainer.querySelectorAll('.btn-copy').forEach(function (btn) {
      btn.addEventListener('click', handleCopyClick);
    });
  }

  /**
   * Копирование содержимого в буфер обмена
   */
  async function handleCopyClick(e) {
    const btn = e.currentTarget;
    const textToCopy = btn.getAttribute('data-text');
    if (!textToCopy) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback для устаревших сред
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Визуальный отклик
      const span = btn.querySelector('span');
      const originalText = span.textContent;

      btn.classList.add('copied');
      span.textContent = 'Скопировано! ✓';

      setTimeout(function () {
        btn.classList.remove('copied');
        span.textContent = originalText;
      }, 1500);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  }

  /**
   * Склонение слова "программа"
   */
  function getPluralPrograms(n) {
    const abs = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return 'программ';
    if (last > 1 && last < 5) return 'программы';
    if (last === 1) return 'программа';
    return 'программ';
  }

  /**
   * Обработка поиска
   */
  function handleSearchInput(e) {
    searchQuery = e.target.value;
    searchClearBtn.hidden = !searchQuery;
    renderCatalog();
  }

  function handleSearchClear() {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.hidden = true;
    searchInput.focus();
    renderCatalog();
  }

  /**
   * Переключение категорий
   */
  function handleCategoryClick(e) {
    const pill = e.currentTarget;
    const category = pill.getAttribute('data-category');

    categoryPills.forEach(function (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    pill.classList.add('active');
    pill.setAttribute('aria-pressed', 'true');
    currentCategory = category;

    renderCatalog();
  }

  /**
   * Сброс всех фильтров
   */
  function handleResetFilters() {
    searchInput.value = '';
    searchQuery = '';
    searchClearBtn.hidden = true;
    currentCategory = 'all';

    categoryPills.forEach(function (btn) {
      const isAll = btn.getAttribute('data-category') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-pressed', isAll ? 'true' : 'false');
    });

    renderCatalog();
    searchInput.focus();
  }

  /**
   * Управление модальным окном "О проекте"
   */
  function setupDialog() {
    if (!aboutDialog) return;

    if (openAboutBtn) {
      openAboutBtn.addEventListener('click', function () {
        if (typeof aboutDialog.showModal === 'function') {
          aboutDialog.showModal();
        } else {
          aboutDialog.setAttribute('open', '');
        }
      });
    }

    function closeDialog() {
      if (typeof aboutDialog.close === 'function') {
        aboutDialog.close();
      } else {
        aboutDialog.removeAttribute('open');
      }
    }

    if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeDialog);
    if (confirmAboutBtn) confirmAboutBtn.addEventListener('click', closeDialog);

    aboutDialog.addEventListener('click', function (e) {
      const rect = aboutDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeDialog();
      }
    });
  }

  /**
   * Инициализация событий
   */
  function initEvents() {
    // Вкладки
    navTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const tabName = tab.getAttribute('data-tab');
        switchTab(tabName);
      });
    });

    // Хеш в URL
    if (window.location.hash === '#clipboards') {
      switchTab('clipboards');
    } else {
      switchTab('catalog');
    }

    window.addEventListener('hashchange', function () {
      if (window.location.hash === '#clipboards') {
        switchTab('clipboards');
      } else {
        switchTab('catalog');
      }
    });

    // Поиск и фильтры
    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', handleSearchClear);
    }

    categoryPills.forEach(function (pill) {
      pill.addEventListener('click', handleCategoryClick);
    });

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', handleResetFilters);
    }

    setupDialog();
  }

  // Запуск
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initEvents();
      loadData();
    });
  } else {
    initEvents();
    loadData();
  }
})();
