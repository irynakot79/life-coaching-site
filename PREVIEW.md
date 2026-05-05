# Quick start — Irina's Garden

Полностью статичный сайт (HTML + CSS + немного JS). Никакого билда, никаких зависимостей. Откроется как из проводника, но для корректной работы путей и шрифтов рекомендуется локальный сервер.

## Запуск локально

### Вариант 1 — одной командой (macOS / Linux / WSL)
```bash
chmod +x preview.sh  # один раз
./preview.sh          # откроет http://localhost:8765
```

### Вариант 2 — Python напрямую
```bash
python3 -m http.server 8765
# открой http://localhost:8765
```

### Вариант 3 — Node.js
```bash
npx --yes serve .
```

### Вариант 4 — VS Code
Поставить расширение **Live Server**, правый клик по `index.html` → «Open with Live Server».

## Деплой на GitHub Pages
В репозитории: **Settings → Pages → Branch: `main`, Folder: `/ (root)`** → Save.
Сайт опубликуется на `https://<username>.github.io/life-coaching-site/` через 1–2 минуты.

## Что где менять (быстрая шпаргалка)

| Нужно поменять | Файл | Как |
|---|---|---|
| Тексты EN и RU | `*.html` | Найти `data-en="..." data-ru="..."` и поменять оба варианта |
| Цены | все `.html` | Поиск `$95`, `$85`, `$29`, `$25` → заменить на новые |
| Email | все `.html` | Поиск `irynakot2016@gmail.com` → заменить |
| Портрет на главной | `index.html` hero → `images/irina-photo.jpg` | Заменить файл тем же именем |
| Отзывы в карусели | `index.html` блок `class="testimonials"` | Поправить `<blockquote>` + `<figcaption>` (EN и RU) |
| Добавить ещё отзыв | `index.html` | Скопировать `<figure class="slide">...</figure>` + добавить одну `<button class="dot">` |
| Цвета | `styles.css` верх файла в `:root {}` | Поменять hex-значения `--sage`, `--gold` и т.п. |
| Картинки карточек | любой `.html` | Заменить URL `https://images.unsplash.com/...` |

## Цены (сейчас на сайте)

| Формат | Цена | Где указано |
|---|---|---|
| Private conversation (1-на-1) | **$95** | `index.html` карточка Rose Garden + `archive.html` карточка "Finding your own voice" |
| Reflective letter (письмо-разбор) | **$85** | `index.html` карточка Letters from the Kitchen |
| Live conversation (разовая встреча) | **$25** | `archive.html` карточка "A live conversation by the fire" |
| Quiet Garden Circle (ежемесячный круг) | **$29 / месяц** | `index.html` карточка Quiet Garden Circle + `archive.html` карточка Quiet Garden Circle |

## Чеклист перед публикацией
- [ ] Проверить цены в актуальных валютах (сейчас $ — если нужны € или ₽, сделать поиск-замену)
- [ ] Поменять плейсхолдер-отзывы на реальные цитаты + даты
- [ ] Настоящий портрет в `images/irina-photo.jpg` (если нужен другой)
- [ ] Проверить в браузере переключатель **EN ↔ RU** на всех страницах
- [ ] Открыть на телефоне (responsive)
- [ ] В `<head>` каждой страницы обновить `<meta property="og:image">` если будет новый портрет
