const Equipe = require("../models/equipeModel");

exports.criarEquipe = async (req, res) => {
  try {
    const { nome, desafioId } = req.body;
    const alunoId = req.user.id;

    if (!nome || !desafioId) {
      return res.status(400).json({
        message: "Nome da equipe e desafioId são obrigatórios"
      });
    }

    // cria equipe já vinculada ao desafio
    const equipe = await Equipe.create(nome, desafioId);

    // adiciona criador como membro
    await Equipe.addMembro(equipe.id, alunoId);

    return res.status(201).json({
      message: "Equipe criada com sucesso",
      equipe
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar equipe",
      error: error.message
    });
  }
};

exports.entrarNaEquipe = async (req, res) => {
  try {
    const alunoId = req.user.id;
    const equipeId = req.params.id;

    const equipe = await Equipe.findById(equipeId);

    if (!equipe) {
      return res.status(404).json({
        message: "Equipe não encontrada"
      });
    }

    const jaMembro = await Equipe.verificarMembro(equipeId, alunoId);

    if (jaMembro) {
      return res.status(400).json({
        message: "Você já faz parte desta equipe"
      });
    }

    await Equipe.addMembro(equipeId, alunoId);

    return res.json({
      message: "Entrou na equipe com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao entrar na equipe",
      error: error.message
    });
  }
};

exports.listarEquipe = async (req, res) => {
  try {
    const equipeId = req.params.id;

    const equipe = await Equipe.getEquipeCompleta(equipeId);

    if (!equipe) {
      return res.status(404).json({
        message: "Equipe não encontrada"
      });
    }

    return res.json({
      equipe
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar equipe",
      error: error.message
    });
  }
};