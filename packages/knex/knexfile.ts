import type { Knex } from "knex";
import 'dotenv/config'

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

  production: {
    client: "pg",
    connection: {
      database: "wedding-site-db",
      host: process.env.POSTGRES_HOST_PROD,
      port: parseInt(process.env.POSTGRES_PORT_PROD),
      user: process.env.POSTGRES_USER_PROD,
      password: process.env.POSTGRES_PASSWORD_PROD,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
