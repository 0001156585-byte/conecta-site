const Projeto = require("../models/projetoModel");
const Equipe = require("../models/equipeModel");

exports.submeterProjeto = async (req, res) => {
  try {
    const equipeId = req.params.equipeId;
    const alunoId = req.user.id;

    // busca projeto
    const projeto = await Projeto.findByEquipe(equipeId);

    if (!projeto) {
      return res.status(404).json({
        message: "Projeto não encontrado"
      });
    }

    // (opcional) validar se aluno é membro da equipe
    const membro = await Equipe.verificarMembro(equipeId, alunoId);

    if (!membro) {
      return res.status(403).json({
        message: "Você não pertence a esta equipe"
      });
    }

    // valida status
    if (projeto.status === "SUBMETIDO") {
      return res.status(400).json({
        message: "Projeto já foi submetido"
      });
    }

    // submete
    await Projeto.submeter(projeto.id);

    return res.json({
      message: "Projeto submetido com sucesso",
      data: {
        projetoId: projeto.id,
        status: "SUBMETIDO"
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao submeter projeto",
      error: error.message
    });
  }
};