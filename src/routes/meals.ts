import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/checkSessionIdExists'

const mealRoutesMiddlewares = { preHandler: [checkSessionIdExists] }

export async function mealRoutes(app: FastifyInstance) {
  app.post('/', mealRoutesMiddlewares, async (req, reply) => {
    const mealSchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      time: z.string().min(5).max(5),
      is_it_in_diet: z.boolean()
    })

    const bodyData = mealSchema.parse(req.body)
    const mealId = randomUUID()
    const userSessionId = req.cookies.sessionId

    await knex('meals').insert({
      id: mealId,
      session_id: userSessionId,
      ...bodyData
    })

    reply.status(201).send()
  })
}
