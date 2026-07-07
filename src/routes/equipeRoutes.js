const express = require("express");
const router = express.Router();

const equipeController = require("../controllers/equipeController");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar equipe
router.post("/", authMiddleware, equipeController.criarEquipe);

// Entrar na equipe
router.post("/:id/join", authMiddleware, equipeController.entrarNaEquipe);

// Inscrever no desafio
//router.post("/:id/desafio/:desafioId", authMiddleware, equipeController.inscreverDesafio);

// Ver equipe
router.get("/:id", authMiddleware, equipeController.listarEquipe);

module.exports = router;