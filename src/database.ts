import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

const config: Knex.Config = {
  client: 'sqlite',
  // debug: true,
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true, // campos do banco com null por default
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

const knex = setupKnex(config)

export { config, knex }
