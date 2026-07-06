require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const desafioRoutes = require("./routes/desafios");

app.use("/api/auth", authRoutes);
app.use("/api/desafios", desafioRoutes);

app.get("/", (req, res) => {
    res.send("ConectaEPT funcionando!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});