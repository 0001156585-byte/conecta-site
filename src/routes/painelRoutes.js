const express = require("express");
const router = express.Router();

console.log("PainelRoutes carregada");

router.get("/", (req, res) => {
    res.json({
        mensagem: "Painel funcionando!"
    });
});

module.exports = router;