import type { Knex } from "knex";
import 'dotenv/config'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    migrations: {
      tableName: 'knex_migrations'
    },
    connection: {
      database: "wedding-site-db",
      host: `127.0.0.1`,
      port: 8000,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
