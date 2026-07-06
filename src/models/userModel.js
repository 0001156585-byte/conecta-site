const db = require("../config/db");

module.exports = {

    async create(nome, email, senhaHash, tipo) {
        const [result] = await db.execute(
            `INSERT INTO users
            (nome, email, senha_hash, tipo)
            VALUES (?, ?, ?, ?)`,
            [nome, email, senhaHash, tipo]
        );

        return result.insertId;
    },

    async findByEmail(email) {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows[0];
    }

};