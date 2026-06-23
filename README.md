# Phone Input Demo App

🚀 **Проект задеплоен на GitHub Pages и доступен по ссылке:**  
[https://maxkrch.github.io/phone-input/](https://maxkrch.github.io/phone-input/)

---

### Установка зависимостей
```bash
yarn install
```

### Локальный запуск
Запуск локального сервера разработки с поддержкой Hot Reload (по умолчанию на `http://localhost:3000`):
```bash
yarn start
```

### Сборка проекта (Production)

```bash
yarn build
```
Проект собирается в директории /dist
---


## 🤖 Автоматизация (CI/CD)

В репозитории настроен автоматический деплой через **GitHub Actions** (`.github/workflows/deploy.yml`). 
При каждом пуше изменений в ветку `main` робот автоматически:
1. Скачивает актуальный код.
2. Устанавливает зависимости и собирает production-версию приложения.
3. Пушит содержимое папки `dist` в ветку `gh-pages`, обновляя работающий сайт.