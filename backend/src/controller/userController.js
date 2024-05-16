const UserModel = require('../models/userModel')

const createUser = (req, res) => {
    const {nome, pontuacao, tempo} = req.body
    console.log(nome)
    console.log(pontuacao)

    if (!nome || !pontuacao || !tempo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, pontuacao, tempo' });
    }

    UserModel.createUser(nome,pontuacao,tempo, (err, user) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        res.json(user)
    })
}

const getAllUsers = (req, res) => {
    UserModel.getAllUsers((err,users) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        res.json(users)
    })
}

const getOneUser = (req, res) => {
    const userId = req.params.id 
    UserModel.getOneUser(userId, (err, user) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if(!user) {
            return res.status(400).json({error: "Usuario não encontrador"})
        }
        res.json(user)
    })
}

const deleteUserById = (req, res) => {
    const userId = req.params.id

    UserModel.deleteUserById(userId, (err,result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if(result.changes === 0) {
            return res.status(404).json({error: 'Usuário não encontrado'})
        }
        res.json({message: "Usúario excluido com sucesso"})
    })
}

const updateUser = (req,res) => {
    const userId = req.params.id
    const {pontuacao, tempo} = req.body

    if(!pontuacao && !tempo) {
        return res.status(400).json({error: 'É necessário fornecer a pontuação e o tempo'})
    }

    UserModel.updateUser(userId, pontuacao, tempo, (err, result) => {
        if(err) {
            return res.status(500).json({error: err.message})
        }
        if(!result.changes) {
            return res.status(400).json({error: 'Usuário não encontrado'})
        }
        res.json({message: 'Usuário atualizado com sucesso'})
    })
}

module.exports = {
    createUser, getAllUsers, getOneUser, deleteUserById, updateUser
}