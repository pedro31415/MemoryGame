const db = require("./connection")

const createUser = (nome,pontuacao,tempo,callback) => {
    const sql = 'INSERT INTO usuario (nome,pontuacao,tempo) VALUES (?,?,?)'
    db.run(sql, [nome,pontuacao,tempo], function(err){
        if(err) {
            return callback(err);
        }
        callback(null, {
            id: this.lastID, nome, pontuacao, tempo
        })
    })
}

const getAllUsers = (callback) => {
    db.all('SELECT * FROM usuario', [], (err, rows) => {
        if(err) {
            return callback(err);
        }
        callback(null, rows)
    })
}

const getOneUser = (id,callback) => {
    db.get('SELECT * FROM usuario WHERE id = ?', [id], (err,row) => {
        if(err) {
            return callback(err)
        } 
        callback(null, row)
    })
} 

const deleteUserById = (id, callback) => {
    const sql = 'DELETE FROM usuario WHERE id = ?'
    db.run(sql, [id], function(err) {
        if(err) {
            return callback(err)
        }
        callback(null, { message: 'Usuário excluído com sucesso', changes: this.changes })
    })
}

const updateUser = (id, pontuacao, tempo, callback) => {
    let updateFields = []
    let params = []
    if(pontuacao) {
        updateFields.push('pontuacao = ?')
        params.push(pontuacao)
    }
    if(tempo) {
        updateFields.push('tempo = ?')
        params.push(tempo)
    }
    if(updateFields.length === 0) {
        return callback(null, {changes: 0})
    }

    const sql = `UPDATE usuario SET ${updateFields.join(',')} WHERE id = ?`
    params.push(id)

    db.run(sql, params, function(err) {
        if(err) {
            return callback(err)
        }
        callback(null, {changes: this.changes})
    })
}

module.exports = {
    createUser, getAllUsers, getOneUser, deleteUserById, updateUser
}