const express = require("express");

const router = express.Router();

const avaliacaoController = require("../controllers/avaliacaoController");


// cadastrar avaliação
router.post(
    "/",
    avaliacaoController.criarAvaliacao
);


// visualizar feedback
router.get(
    "/projeto/:id",
    avaliacaoController.buscarFeedback
);


module.exports = router;