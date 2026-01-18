# Быстрый деплой платформы

## Первый раз

1. Инициализируйте Git репозиторий (если еще не сделано):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/internal-tools.git
   git push -u origin main
   ```

2. Задеплойте:
   ```bash
   npm run deploy
   ```

3. Настройте GitHub Pages:
   - Settings → Pages → Source: `gh-pages` branch

4. URL будет: `https://OB1-WAN-KENOBI.github.io/Internal-Tools/`

## Обновление

Просто запустите:
```bash
npm run deploy
```

## Если репозиторий в подпапке

Если репозиторий находится в подпапке GitHub Pages:
```bash
VITE_BASE_PATH=/repo-name npm run deploy
```
