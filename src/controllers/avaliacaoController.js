const Avaliacao = require("../models/avaliacaoModel");
const Projeto = require("../models/projetoModel");
const { gerarCertificadoPDF } = require("../utils/gerarCertificadoPDF");

// Criar avaliação
exports.criarAvaliacao = async (req, res) => {

    try {

        const id = await Avaliacao.criar(req.body);
        const projetoId = req.body.projeto_id;

        await Projeto.updateStatus(projetoId, "AVALIADO");

        await gerarCertificadoPDF(projetoId);




        res.status(201).json({
            mensagem: "Avaliação registrada",
            id
        });


    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

};



// Visualizar feedback
exports.buscarFeedback = async (req, res) => {

    try {

        const dados = await Avaliacao.buscarPorProjeto(
            req.params.id
        );


        res.json(dados);


    } catch (error) {

        res.status(500).json({
            erro: error.message
        });

    }

};