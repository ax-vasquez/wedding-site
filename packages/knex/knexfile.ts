import type { Knex } from "knex";
import fs from 'fs'
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
      uri: process.env.POSTGRES_PROD_URL,
      ssl: {
        ca: fs.readFileSync('./ca-certificate.crt')
      }
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
