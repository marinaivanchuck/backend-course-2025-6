# Офіційний Node.js образ
FROM node:20

# Створюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь проєкт
COPY . .

# Виставляємо порт
EXPOSE 3000

# Команда запуску
CMD ["node", "index.js", "-h", "0.0.0.0", "-p", "3000", "-c", "./cache"]

