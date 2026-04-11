#!/bin/bash
set -e

# Create multiple databases for different services
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- GlitchTip database
    CREATE DATABASE glitchtip;
    GRANT ALL PRIVILEGES ON DATABASE glitchtip TO postgres;

    -- Application database (Drizzle)
    CREATE DATABASE db;
    GRANT ALL PRIVILEGES ON DATABASE db TO postgres;

    -- Enable Vector extension
    \c db
    CREATE EXTENSION IF NOT EXISTS vector;
EOSQL

echo "✅ Databases created: glitchtip, db"
