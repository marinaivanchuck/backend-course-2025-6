// =======================
// LAB 6 — PART 1
// Commander.js arguments + server initialization
// =======================

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const { program } = require('commander');

// ----------------------------------------------
// 1. Визначаємо обов'язкові параметри командного рядка
// ----------------------------------------------
program
  .requiredOption('--host <host>', 'Server host')
  .requiredOption('--port <port>', 'Server port', value => parseInt(value, 
10))
  .requiredOption('--cache <path>', 'Cache directory');

program.parse(process.argv);
const options = program.opts();

// Дістаємо значення
const HOST = options.host;
const PORT = options.port;
const CACHE_DIR = path.resolve(options.cache);

// ----------------------------------------------
// 2. Перевіряємо, чи існує кеш-директорія. Якщо ні — створюємо.
// ----------------------------------------------
if (!fs.existsSync(CACHE_DIR)) {
  console.log(`Cache directory does not exist. Creating: ${CACHE_DIR}`);
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// ----------------------------------------------
// 3. Ініціалізуємо express
// ----------------------------------------------
const app = express();

// Тестовий endpoint тільки для перевірки частини 1
app.get('/', (req, res) => {
  res.send('Server is running (Lab 6 — Part 1 completed)');
});

// ----------------------------------------------
// 4. Створюємо HTTP сервер і запускаємо його
// ----------------------------------------------
const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
  console.log(`Using cache directory: ${CACHE_DIR}`);
});

