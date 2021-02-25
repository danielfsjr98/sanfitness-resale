module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const saleItem = { ...req.body }
        if(req.params.id) saleItem.id = req.params.id

        try {
            existsOrError(saleItem.unit_price, 'Preço unitário não informado.')
            existsOrError(saleItem.amount, 'Quantidade não informada.')
            existsOrError(saleItem.userId, 'Usuário não informado.')
            existsOrError(saleItem.salesId, 'Pedido não informado.')
            existsOrError(saleItem.product_id, 'Produto não informado.')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        saleItem.total_price = saleItem.unit_price * saleItem.amount
        
        if(saleItem.id) {
            app.db('sales_item')
                .update(saleItem)
                .where({id: saleItem.id})
                .then( () => {
                    decreaseStock(saleItem.product_id, saleItem.amount)
                    return res.status(204).send() 
                })
                .catch(err => res.status(500).send(err))
        } else {
            app.db('sales_item')
                .insert(saleItem)
                .then ( () => {
                    decreaseStock(saleItem.product_id, saleItem.amount)
                    return res.status(204).send()
                })
                .catch(err => res.status(500).send(err))
        }
    }

    const decreaseStock = async (idProduct, quantitySales) =>{
        const productFromDB = await app.db('product')
            .where({ id: idProduct}).first()
        productFromDB.quantityInStock = productFromDB.quantityInStock - quantitySales
        app.db('product')
            .update(productFromDB)
            .where({id: idProduct})
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        const saleItemId = req.params.id
        try{
            existsOrError(saleItemId, 'Id não informado')
            const saleItemIdFromDB = await app.db('sales_item')
                .where({ id: saleItemId}).first()
            existsOrError(saleItemIdFromDB, 'Item não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('sales_item')
            .select().first()
            .where({id: saleItemId})
            .then( saleItem => res.json(saleItem))
            .catch(err => res.status(500).send(err))
    }

    const increaseStock = async (idProduct, quantitySales) =>{
        const productFromDB = await app.db('product')
            .where({ id: idProduct}).first()
        productFromDB.quantityInStock = productFromDB.quantityInStock + quantitySales
        app.db('product')
            .update(productFromDB)
            .where({id: idProduct})
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const saleItemId = req.params.id
        try{
            existsOrError(saleItemId, 'Id não informado')
            const saleItemIdFromDB = await app.db('sales_item')
                .where({ id: saleItemId}).first()
            existsOrError(saleItemIdFromDB, 'Produto não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('sales_item')
            .del()
            .where({id: saleItemId})
            .then( saleItem => res.json(saleItem))
            .catch(err => res.status(500).send(err))
    }

    return { save, getById, remove}
}