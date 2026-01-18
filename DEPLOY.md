# Инструкция по деплою платформы

## Быстрый старт

```bash
npm run deploy
```

## Подробная инструкция

1. Убедитесь, что проект инициализирован как Git репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Создайте репозиторий на GitHub и добавьте remote:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/internal-tools.git
   ```

3. Запустите деплой:
   ```bash
   npm run deploy
   ```

4. Настройте GitHub Pages:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`

5. URL будет: `https://YOUR_USERNAME.github.io/internal-tools/`

## Если репозиторий в подпапке

Если репозиторий находится в подпапке (например, `username/repo-name`), установите `VITE_BASE_PATH`:

```bash
VITE_BASE_PATH=/repo-name npm run deploy
```

## Обновление

После изменений просто запустите:
```bash
npm run deploy
```
