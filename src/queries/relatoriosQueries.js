const db = require("../config/db");


// Quantidade de desafios
async function totalDesafios(){

    const [resultado] = await db.query(`
        SELECT COUNT(*) AS total
        FROM desafios
    `);

    return resultado[0];

}


// Quantidade de equipes
async function totalEquipes(){

    const [resultado] = await db.query(`
        SELECT COUNT(*) AS total
        FROM equipes
    `);

    return resultado[0];

}


// Quantidade de projetos
async function totalProjetos(){

    const [resultado] = await db.query(`
        SELECT COUNT(*) AS total
        FROM projetos
    `);

    return resultado[0];

}


// Média das avaliações

async function mediaAvaliacoes(){

    const [resultado] = await db.query(`
        SELECT 
        AVG(
            (criatividade +
             autonomia +
             integracao_tp +
             impacto) / 4
        ) AS media

        FROM avaliacoes
    `);


    return resultado[0];

}



module.exports = {

    totalDesafios,
    totalEquipes,
    totalProjetos,
    mediaAvaliacoes

};