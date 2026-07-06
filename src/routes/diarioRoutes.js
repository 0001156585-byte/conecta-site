const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const diarioController = require("../controllers/diarioController");

// criar registro
router.post("/", authMiddleware, diarioController.criarRegistro);

// listar por projeto
router.get("/projeto/:projetoId", authMiddleware, diarioController.listarPorProjeto);

// meus registros
router.get("/meus", authMiddleware, diarioController.meusRegistros);

module.exports = router;