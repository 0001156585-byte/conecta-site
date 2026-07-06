const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authMiddleware =
    require("../middlewares/authMiddleware");

const desafioController =
    require("../controllers/desafioController");

router.post(
    "/",
    authMiddleware,

    body("titulo")
        .notEmpty()
        .withMessage("Título é obrigatório"),

    body("descricao")
        .notEmpty()
        .withMessage("Descrição é obrigatória"),

    body("area")
        .notEmpty()
        .withMessage("Área é obrigatória"),

    body("prazo")
        .notEmpty()
        .withMessage("Prazo é obrigatório")
        .isDate()
        .withMessage("Prazo inválido"),

    desafioController.criarDesafio
);

router.put(
    "/:id/status",
    authMiddleware,
    desafioController.atualizarStatus
);

router.get(
    "/",
    authMiddleware,
    desafioController.listarDesafios
);

router.post(
    "/:desafioId/turma",
    authMiddleware,
    desafioController.associarTurma
);

module.exports = router;