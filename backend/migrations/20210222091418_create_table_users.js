
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('cpf').notNull().unique()
        table.string('cep').notNull()
        table.string('adress').notNull()
        table.string('password').notNull()
        table.boolean('reseller').notNull().defaultTo(false)
        table.boolean('admin').notNull().defaultTo(false)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};

