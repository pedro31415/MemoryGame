const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database(':memory', (err) => {
    if(err) {
        return console.error(err.message)
    }
    console.log("Conexão feita com sucesso!")
})

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS usuario (id INTERGER PRIMARY KEY, nome TEXT, pontuacao INTERGER, tempo INTERGER)')
})

module.exports = db