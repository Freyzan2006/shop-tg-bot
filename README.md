# 🤖 Shop TG Bot

Телеграм-бот на **Grammy**, **TypeScript** и **MongoDB**, онлайн магазина с интеграцией оплаты, работы с базой данных и модульной архитектуры.

---

## 🚀 Стек технологий

- [Node.js 22 (Alpine)](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Grammy](https://grammy.dev/)
- [MongoDB 8](https://www.mongodb.com/)
- [Docker & Docker Compose](https://www.docker.com/)
- [Makefile](https://www.gnu.org/software/make/)

---

## ⚙️ Переменные окружения

Создай файл **`.env`** в корне проекта и укажи следующие параметры:

```bash
# Telegram Bot Token
BOT_TOKEN=<token>

# MongoDB connection string
# Для продакшена:
MONGODB_URI=mongodb://shop-tg-bot:shop-tg-bot@mongo:27017/shop-tg-db?authSource=admin

# Для разработки:
MONGODB_URI=mongodb://shop-tg-bot:shop-tg-bot@localhost:27017/shop-tg-db?authSource=admin

# Telegram Payments token
PAYMENT_TOKEN=12345
```

---

## 🐳 Docker Compose

Файл `docker-compose.yml`:

```yaml
services:
  bot: 
    build: .
    container_name: shop-tg
    env_file:
      - .env
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks: 
      - app-network

  mongo:
    image: mongo:8
    container_name: shop-tg-db
    environment:
      MONGO_INITDB_ROOT_USERNAME: shop-tg-bot
      MONGO_INITDB_ROOT_PASSWORD: shop-tg-bot
    ports:
      - "27017:27017"
    networks: 
      - app-network
      
networks:
  app-network:
```

---

## 🧱 Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:prod

CMD ["npm", "run", "start:prod"]
```

---

## 🧰 Makefile команды

```makefile
# Запуск только MongoDB (для локальной разработки)
db:
	docker compose up -d mongo

# Полный запуск (с пересборкой образа)
pre-prod:
	docker-compose up --build

# Продакшен-режим (в фоне)
prod:
	docker-compose up -d
```

---

## 💻 Запуск проекта

### 🔸 Локальная разработка (без Docker)
```bash
# Установка зависимостей
npm install

# Компиляция TypeScript
npm run build

# Запуск бота
npm run dev
```

Убедись, что MongoDB запущена локально:
```bash
make db
```

---

### 🔸 С Docker Compose
```bash
# Собрать и запустить бота и MongoDB
make pre-prod
```

или в продакшен-режиме:
```bash
make prod
```

---

## ✅ Проверка

После запуска:
- MongoDB работает на `localhost:27017`
- Бот подключён и пишет в консоль:
  ```
  Bot running & Mongo DB Connect
  ```
- Можно проверить через Telegram, отправив `/start`.

---


## 🧩 Комментарии

- Для продакшена URI к Mongo должен ссылаться на контейнер `mongo`, а не `localhost`.
- Бот автоматически подключается к MongoDB перед запуском.
- Поддерживает раздельные режимы `dev` и `prod`.
