const db = require("../config/db");

module.exports = {

    async create(
        empresaId,
        titulo,
        descricao,
        area,
        prazo,
        recursos
    ) {

        const [result] = await db.execute(
            `INSERT INTO desafios
            (
                empresa_id,
                titulo,
                descricao,
                area,
                prazo,
                recursos,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, 'PENDENTE')`,
            [
                empresaId,
                titulo,
                descricao,
                area,
                prazo,
                recursos
            ]
        );

        return result.insertId;
    },

    async updateStatus(
        id,
        novoStatus
    ) {

        await db.execute(
            `UPDATE desafios
             SET status = ?
             WHERE id = ?`,
            [novoStatus, id]
        );

    },

    async findAbertos(page, limit) {

        const offset = (page - 1) * limit;
    
        const [rows] = await db.execute(
            `SELECT *
             FROM desafios
             WHERE status = 'ABERTO'
             LIMIT ?
             OFFSET ?`,
            [
                limit,
                offset
            ]
        );
    
        return rows;
    },

    async associarTurma(
        desafioId,
        turmaId
    ) {

        await db.execute(
            `INSERT INTO desafio_turmas
            (
                desafio_id,
                turma_id
            )
            VALUES (?, ?)`,
            [desafioId, turmaId]
        );

    }

};