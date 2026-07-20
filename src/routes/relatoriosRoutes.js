const express = require("express");

const router = express.Router();

const controller =
require("../controllers/relatoriosController");


// RF-15 - Dashboard de indicadores
router.get(
    "/dashboard",
    controller.dashboard
);


// RF-16 - Relatório PDF da empresa
router.get(
    "/empresa/:id/pdf",
    controller.relatorioEmpresaPDF
);


module.exports = router;