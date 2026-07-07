require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

// Importação das rotas
const authRoutes = require("./routes/authRoutes");
const desafiosRoutes = require("./routes/desafiosRoutes");
const equipeRoutes = require("./routes/equipeRoutes");
const docentesRoutes = require("./routes/docentesRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");
const relatoriosRoutes = require("./routes/relatoriosRoutes");

// Registro das rotas
app.use("/api/auth", authRoutes);
app.use("/api/desafios", desafiosRoutes);
app.use("/api/equipes", equipeRoutes);
app.use("/api/docentes", docentesRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use("/api/relatorios", relatoriosRoutes);

app.get("/", (req, res) => {
    res.send("ConectaEPT funcionando!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});