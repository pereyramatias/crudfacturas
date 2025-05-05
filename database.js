const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');

// Verifica si la base de datos existe. Si no, la crea usando el script SQL.
if (!fs.existsSync(dbPath)) {
  const initSql = fs.readFileSync(path.join(__dirname, 'init_db.sql'), 'utf8');
  const tempDb = new sqlite3.Database(dbPath);
  tempDb.exec(initSql, (err) => {
    if (err) console.error("Error al crear la base:", err);
    else console.log("Base de datos creada automáticamente.");
  });
}

const db = new sqlite3.Database(dbPath);
module.exports = db;
