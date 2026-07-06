const db = require("../config/db");

exports.create = async (projetoId, alunoId, conteudo) => {
  const [result] = await db.execute(
    `INSERT INTO diario_bordo (projeto_id, aluno_id, conteudo)
     VALUES (?, ?, ?)`,
    [projetoId, alunoId, conteudo]
  );

  return {
    id: result.insertId,
    projetoId,
    alunoId,
    conteudo
  };
};

exports.findByProjeto = async (projetoId) => {
  const [rows] = await db.execute(
    `SELECT d.id, d.conteudo, d.criado_em,
            u.id as aluno_id, u.nome
     FROM diario_bordo d
     JOIN users u ON u.id = d.aluno_id
     WHERE d.projeto_id = ?
     ORDER BY d.criado_em DESC`,
    [projetoId]
  );

  return rows;
};

exports.findByAluno = async (alunoId) => {
  const [rows] = await db.execute(
    `SELECT * FROM diario_bordo
     WHERE aluno_id = ?
     ORDER BY criado_em DESC`,
    [alunoId]
  );

  return rows;
};