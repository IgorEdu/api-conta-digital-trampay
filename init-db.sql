SELECT 'CREATE DATABASE trampay' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'trampay');

-- Habilitar a extensão UUID (se necessário)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";