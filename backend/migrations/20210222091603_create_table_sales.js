
exports.up = function(knex) {
    return knex.schema.createTable('sales', table => {
        table.increments('id').primary()
        table.datetime('sale_date', { precision: 6 }).defaultTo(knex.fn.now(6)).notNull()
        table.decimal('total_sale', 14, 2).notNull();
        table.integer('userId').references('id').inTable('users').notNull()
        table.boolean('fulfilled').notNull().defaultTo(false)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales')
};
