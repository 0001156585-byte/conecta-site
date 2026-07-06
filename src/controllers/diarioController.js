const Diario = require("../models/diarioModel");
const Projeto = require("../models/projetoModel"); // se tiver

exports.criarRegistro = async (req, res) => {
  try {
    const { projetoId, conteudo } = req.body;
    const alunoId = req.user.id;

    if (!projetoId || !conteudo) {
      return res.status(400).json({
        message: "projetoId e conteudo são obrigatórios"
      });
    }

    const registro = await Diario.create(
      projetoId,
      alunoId,
      conteudo
    );

    return res.status(201).json({
      message: "Registro criado com sucesso",
      registro
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar diário",
      error: error.message
    });
  }
};

exports.listarPorProjeto = async (req, res) => {
  try {
    const projetoId = req.params.projetoId;

    const registros = await Diario.findByProjeto(projetoId);

    return res.json({
      projetoId,
      registros
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar diário",
      error: error.message
    });
  }
};

exports.meusRegistros = async (req, res) => {
  try {
    const alunoId = req.user.id;

    const registros = await Diario.findByAluno(alunoId);

    return res.json({
      alunoId,
      registros
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar registros",
      error: error.message
    });
  }
};