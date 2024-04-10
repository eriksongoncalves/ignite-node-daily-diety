import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('is_it_in_diet').notNullable().defaultTo(false)
    table.date('date')
    table.string('time', 5)
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()

    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
