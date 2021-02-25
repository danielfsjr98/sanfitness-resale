
exports.up = function(knex) {
    return knex.schema.createTable('reseller_sales', table => {
        table.increments('id').primary()
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('salesId').references('id').inTable('sales').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reseller_sales')
};
