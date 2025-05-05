CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
INSERT INTO usuarios (username, password) VALUES ('admin', 'admin123');
);

CREATE TABLE IF NOT EXISTS facturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero_factura INTEGER NOT NULL,
    fecha DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL
);
