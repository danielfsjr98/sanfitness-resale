const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, passRules} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }


    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id
        if(!req.originalUrl.startsWith('/users')) user.admin = false
        //if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.cpf, 'CPF não informado')
            existsOrError(user.cep, 'CEP não informado')
            existsOrError(user.adress, 'Endereço não informado')
            if(!user.id){
                existsOrError(user.password, 'Senha não informada')
                existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
                equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
                passRules(user.password, 'A senha deve conter no mínimo 4 caracteres, pelo menos uma letra e um número.')
            }
            const userEmailFromDB = await app.db('users')
                .where({ email: user.email}).first()
            if(!user.id) notExistsOrError(userEmailFromDB, 'E-mail já cadastrado')
            const userCpfFromDB = await app.db('users')
                .where({ cpf: user.cpf}).first()
            if(!user.id) notExistsOrError(userCpfFromDB, 'CPF já cadastrado')

        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(user.password) user.password = encryptPassword(user.password)
        if(!user.password) delete user.password
        delete user.confirmPassword
        if(user.id) {
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then( () => res.status(204).send() )
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then ( () => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select()
            .then(users =>{ 
                const usersF = users.map(user =>{
                    delete user.password
                    return {...user}
                })
                res.json(usersF)
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        const userId = req.params.id
        try{
            existsOrError(userId, 'Id não informado')
            const userFromDB = await app.db('users')
                .where({ id: userId}).first()
            existsOrError(userFromDB, 'Usuário não existe.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('users')
            .select().first()
            .where({id: userId})
            .then( user => {
                delete user.password
                res.json(user)
            })
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const userId = req.params.id

        try{
            existsOrError(userId, 'Id não informado')
            const userFromDB = await app.db('users')
                .where({ id: userId}).first()
            existsOrError(userFromDB, 'Usuário não existe.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        app.db('users')
            .del()
            .where({id: userId})
            .then( user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const getArticlesByUser = async (req, res) => {
        const userId = req.params.id
        app.db('articles')
            .select()
            .where({userId: userId})
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove, getArticlesByUser}
}