const db = require("../config/db");

// Buscar desafios do docente
async function buscarDesafiosDocente(docente_id){

    const [resultado] = await db.query(`

        SELECT
            d.id,
            d.titulo,
            d.descricao,
            d.prazo,
            d.status

        FROM turmas t

        INNER JOIN desafio_turmas dt
        ON t.id = dt.turma_id

        INNER JOIN desafios d
        ON dt.desafio_id = d.id

        WHERE t.docente_id = ?

    `,[docente_id]);


    return resultado;
}


// Buscar equipes do desafio
async function buscarEquipesDesafio(desafio_id){

    const [resultado] = await db.query(`

        SELECT

            e.id,
            e.nome AS equipe,
            p.status,
            p.submetido_em

        FROM equipes e

        LEFT JOIN projetos p
        ON e.id = p.equipe_id

        WHERE e.desafio_id = ?

    `,[desafio_id]);


    return resultado;
}



module.exports = {

    buscarDesafiosDocente,
    buscarEquipesDesafio

};