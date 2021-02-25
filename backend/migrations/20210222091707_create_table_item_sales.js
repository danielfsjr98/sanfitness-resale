
exports.up = function(knex) {
    return knex.schema.createTable('sales_item', table => {
        table.increments('id').primary()
        table.decimal('unit_price', 14, 2).notNull()
        table.string('amount', 1000).notNull()
        table.decimal('total_price', 14, 2).notNull()
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('salesId').references('id').inTable('sales').notNull()
        table.integer('productid').references('id').inTable('product').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales_item')
};
