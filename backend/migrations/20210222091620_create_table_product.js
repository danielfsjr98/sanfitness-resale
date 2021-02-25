

exports.up = function(knex) {
    return knex.schema.createTable('product', table => {
        table.increments('id').primary()
        table.string('ref').notNull().unique()
        table.string('name').notNull()
        table.decimal('price', 14, 2).notNull()
        table.integer('quantityInStock').notNull()
        table.string('description', 1000).notNull()
        table.string('imageUrl', 1000).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product')
};
