const express = require("express");
const router = express.Router();

const docenteQueries = require("../queries/docenteQueries");


// Buscar desafios do docente
router.get("/desafios/:id", async (req, res) => {

    try {

        const dados = await docenteQueries.buscarDesafiosDocente(
            req.params.id
        );

        res.json(dados);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar desafios do docente"
        });

    }

});


// Buscar equipes de um desafio
// Buscar equipes de um desafio
// Buscar equipes de um desafio
router.get("/desafio/:id/equipes", async (req, res) => {

    try {

        const dados = await docenteQueries.buscarEquipesDesafio(
            req.params.id
        );

        res.json(dados);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar equipes do desafio"
        });

    }

});

console.log("Rotas docentes carregadas");

module.exports = router;