# Конвертер регистров (GitHub Pages Ready)

Готовый проект (Vite + React + Tailwind + Framer Motion) для деплоя на **GitHub Pages**.

## Локальный запуск

```bash
npm ci
npm run dev
```

Открой `http://localhost:5173`.

## Сборка

```bash
npm run build
```

## Деплой на GitHub Pages

1. Создай новый репозиторий и загрузите туда все файлы из архива.
2. Убедись, что ветка называется `main` (или поправь workflow).
3. В Settings → Pages выбери **Build and deployment: GitHub Actions**.
4. Запушь любую правку — пайплайн соберёт и задеплоит сайт на Pages.

> Workflow передаёт `--base=/<repo>/` в `vite build`, поэтому ассеты будут работать без правки `vite.config.ts`.

## Что внутри

- React 18, Vite 5
- Tailwind (через PostCSS)
- Framer Motion, lucide-react
- GH Actions workflow для автодеплоя

## Тесты

В консоли браузера при загрузке компонента выполняются runtime-тесты преобразования регистра и логируют результат.

