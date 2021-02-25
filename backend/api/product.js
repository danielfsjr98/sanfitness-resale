module.exports = app => {
    const { existsOrError, notExistsOrError} = app.api.validation

    const save = async (req, res) => {
        const product = { ...req.body }
        if(req.params.id) product.id = req.params.id

        try {
            existsOrError(product.name, 'Nome não informado.')
            existsOrError(product.ref, 'Referência não informada.')
            existsOrError(product.price, 'Preço unitário não informado.')
            existsOrError(product.quantityInStock, 'Quantidade em estoque não informada.')
            existsOrError(product.description, 'Descrição não informada.')
            existsOrError(product.imageUrl, 'URL da imagem não informado.')
        
            const productRefFromDB = await app.db('product')
                .where({ ref: product.ref}).first()
            if(!product.id) notExistsOrError(productRefFromDB, 'Referência já cadastrada.')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(product.id) {
            app.db('product')
                .update(product)
                .where({id: product.id})
                .then( () => res.status(204).send() )
                .catch(err => res.status(500).send(err))
        } else {
            app.db('product')
                .insert(product)
                .then ( () => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('product')
            .select()
            .then(products =>res.json(products))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        const productId = req.params.id
        try{
            existsOrError(productId, 'Id não informado')
            const productFromDB = await app.db('product')
                .where({ id: productId}).first()
            existsOrError(productFromDB, 'Produto não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('product')
            .select().first()
            .where({id: productId})
            .then( product => res.json(product))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const productId = req.params.id
        try{
            existsOrError(productId, 'Id não informado')
            const productFromDB = await app.db('product')
                .where({ id: productId}).first()
            existsOrError(productFromDB, 'Produto não encontrado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('product')
            .del()
            .where({id: productId})
            .then( product => res.json(product))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove}
}