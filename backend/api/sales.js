module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const sale = { ...req.body }
        if(req.params.id) sale.id = req.params.id

        try {
            existsOrError(sale.total_sale, 'Total não informado.')
            existsOrError(sale.userId, 'Usuário não informado.')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(sale.id) {
            app.db('sales')
                .update(sale)
                .where({id: sale.id})
                .then( id => res.json({id: id[0]}) )
                .catch(err => res.status(500).send(err))
        } else {
            app.db('sales')
                .insert(sale, 'id')
                .then( id => res.json({id: id[0]}) )
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('sales')
            .select()
            .then(sales =>res.json(sales))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        const saleId = req.params.id
        try{
            existsOrError(saleId, 'Id não informado')
            const saleFromDB = await app.db('sales')
                .where({ id: saleId}).first()
            existsOrError(saleFromDB, 'Pedido não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        
        app.db('sales')
            .select().first()
            .where({id: saleId})
            .then( sale => res.json(sale))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const saleId = req.params.id
        try{
            existsOrError(saleId, 'Id não informado')
            const saleFromDB = await app.db('sales')
                .where({ id: saleId}).first()
            existsOrError(saleFromDB, 'Pedido não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('sales')
            .del()
            .where({id: saleId})
            .then( sale => res.json(sale))
            .catch(err => res.status(500).send(err))
    }

    const getSalesItemBySaleId = async (req, res) => {
        const saleId = req.params.id
        app.db('sales_item')
            .select()
            .where({salesId: saleId})
            .then(saleItem => res.json(saleItem))
            .catch(err => res.status(500).send(err))
    }

    const getSalesByUserId = async (req, res) => {
        const userId = req.params.id
        app.db('sales')
            .select()
            .where({userId: userId})
            .then(saleItem => res.json(saleItem))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove, getSalesItemBySaleId, getSalesByUserId}
}