import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { hash } from 'bcryptjs'

import { knex } from '../database'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email('Invalid email'),
      password: z.string().min(6, 'password must be 6 characters')
    })

    const user = userSchema.parse(req.body)

    const userFound = await knex('users').where('email', user.email).first()

    if (userFound) {
      return reply.status(400).send('E-mail already exists')
    }

    const passwordHash = await hash(user.password, 6)

    let { userId } = req.cookies

    if (!userId) {
      userId = randomUUID()

      reply.cookie('sessionId', userId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex('users').insert({
      id: userId,
      ...user,
      password: passwordHash
    })

    reply.status(201).send()
  })
}
