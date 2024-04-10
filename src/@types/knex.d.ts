// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
    }
    meals: {
      id: string
      session_id: string
      name: string
      description: string
      date: Date
      time: string
      is_it_in_diet: boolean
      created_at: string
    }
  }
}
