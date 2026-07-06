const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const projetoController = require("../controllers/projetoController");

// SUBMISSÃO FINAL
router.put(
  "/:equipeId/submeter",
  authMiddleware,
  projetoController.submeterProjeto
);

module.exports = router;