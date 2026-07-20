const Painel = require("../models/painelModel");

exports.dashboard = async (req, res) => {

    try {

        const dados = await Painel.indicadores();

        res.json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

};