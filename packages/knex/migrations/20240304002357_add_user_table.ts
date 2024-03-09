import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
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
        .createTable('users', function (table) {
            table.uuid('id').notNullable().defaultTo(knex.raw("uuid_generate_v4()"))
            table.boolean('is_admin').notNullable().defaultTo(false)
            table.boolean('is_going').notNullable().defaultTo(false)
            table.boolean('can_invite_others').defaultTo(false)
            table.string('first_name')
            table.string('last_name')
            /**
             * We perform lookup by email - if an email match is found, we link the user records together, which allows 
             * guests to add +1s themselves, but also enables the +1s to manage themselves if they sign up using the same
             * email
             */
            table.string('email').nullable().unique()
            table.uuid('hors_doeuvres_selection').nullable()
            table.uuid('entree_selection').nullable()

            table.primary(['id'])
            table.foreign('hors_doeuvres_selection').references('hors_doeuvres.id')
            table.foreign('entree_selection').references('entrees.id')
        })
        .createTable('users_invitees', function (table) {
            table.uuid('user_id')
            table.uuid('user_invitee_id')

            table.foreign('user_id').references('users.id')
            table.foreign('user_invitee_id').references('users.id')
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
    .dropTable('hors_doeuvres')
    .dropTable('entrees')
}
