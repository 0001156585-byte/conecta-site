const db = require("../config/db");


class Avaliacao {

    static async criar(dados) {

        const {
            projeto_id,
            avaliador_id,
            tipo_avaliador,
            criatividade,
            autonomia,
            integracao_tp,
            impacto,
            comentario
        } = dados;


        const [resultado] = await db.query(
            `
            INSERT INTO avaliacoes
            (
                projeto_id,
                avaliador_id,
                tipo_avaliador,
                criatividade,
                autonomia,
                integracao_tp,
                impacto,
                comentario
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                projeto_id,
                avaliador_id,
                tipo_avaliador,
                criatividade,
                autonomia,
                integracao_tp,
                impacto,
                comentario
            ]
        );


        return resultado.insertId;

    }


    static async buscarPorProjeto(projeto_id){

        const [resultado] = await db.query(
            `
            SELECT
                a.*,
                u.nome AS avaliador

            FROM avaliacoes a

            INNER JOIN users u
            ON a.avaliador_id = u.id

            WHERE a.projeto_id = ?
            `,
            [projeto_id]
        );


        return resultado;

    }

}


module.exports = Avaliacao;