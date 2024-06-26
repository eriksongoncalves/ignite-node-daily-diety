import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.string().default('3333'),
  PASSWORD_SALT: z.coerce.number().default(6)
})

// eslint-disable-next-line no-underscore-dangle
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  // eslint-disable-next-line no-console
  console.error('Invalid enviroment variables!', _env.error.format())
  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data
