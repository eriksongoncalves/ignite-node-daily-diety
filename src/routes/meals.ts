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

  app.put('/:mealId', mealRoutesMiddlewares, async (req, reply) => {
    const paramsSchema = z.object({
      mealId: z.string().uuid()
    })

    const mealSchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      time: z.string().min(5).max(5),
      is_it_in_diet: z.boolean()
    })

    const bodyData = mealSchema.parse(req.body)
    const { mealId } = paramsSchema.parse(req.params)
    const userSessionId = req.cookies.sessionId

    const rows = await knex('meals')
      .update({
        ...bodyData
      })
      .where({
        id: mealId,
        session_id: userSessionId
      })

    if (rows >= 1) {
      return reply.status(204).send()
    }

    return reply.status(400).send('Meal not found')
  })

  app.delete('/:mealId', mealRoutesMiddlewares, async (req, reply) => {
    const paramsSchema = z.object({
      mealId: z.string().uuid()
    })

    const { mealId } = paramsSchema.parse(req.params)
    const userSessionId = req.cookies.sessionId

    const rows = await knex('meals').delete().where({
      id: mealId,
      session_id: userSessionId
    })

    if (rows >= 1) {
      return reply.status(204).send()
    }

    return reply.status(400).send('Meal not found')
  })

  app.get('/', mealRoutesMiddlewares, async (req, reply) => {
    const userSessionId = req.cookies.sessionId

    const meals = await knex('meals').select().where({
      session_id: userSessionId
    })

    return reply.status(200).send(meals)
  })
}
