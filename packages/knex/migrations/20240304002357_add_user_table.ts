import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('users', function (table) {
            table.uuid('id').notNullable().defaultTo(knex.raw("uuid_generate_v4()"))
            table.boolean('is_going').notNullable().defaultTo(false)
            table.string('first_name')
            table.string('last_name')
            table.string('email').nullable()
            table.uuid('hors_doeuvre_selection').nullable()
            table.uuid('entree_selection').nullable()

            table.primary(['id'])
        })
        .createTable('hors_doeuvres', function (table) {
            table.uuid('id').notNullable().defaultTo(knex.raw("uuid_generate_v4()"))
            table.string('option_name')

            table.primary(['id'])
        })
        .createTable('entrees', function (table) {
            table.uuid('id').notNullable().defaultTo(knex.raw("uuid_generate_v4()"))
            table.string('option_name')

            table.primary(['id'])
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
    .dropTable('hors_doeuvres')
    .dropTable('entrees')
}
