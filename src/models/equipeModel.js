const db = require("../config/db");

// CRIAR EQUIPE
exports.create = async (nome, desafioId) => {
  const [result] = await db.execute(
    `INSERT INTO equipes (nome, desafio_id)
     VALUES (?, ?)`,
    [nome, desafioId]
  );

  return {
    id: result.insertId,
    nome,
    desafio_id: desafioId
  };
};

// ADICIONAR MEMBRO
exports.addMembro = async (equipeId, alunoId) => {
  await db.execute(
    `INSERT INTO equipes_membros (equipe_id, aluno_id)
     VALUES (?, ?)`,
    [equipeId, alunoId]
  );
};

// VERIFICAR MEMBRO
exports.verificarMembro = async (equipeId, alunoId) => {
  const [rows] = await db.execute(
    `SELECT * FROM equipes_membros
     WHERE equipe_id = ? AND aluno_id = ?`,
    [equipeId, alunoId]
  );

  return rows.length > 0;
};

// BUSCAR EQUIPE
exports.findById = async (id) => {
  const [rows] = await db.execute(
    `SELECT * FROM equipes WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// EQUIPE COMPLETA (JOIN CORRETO)
exports.getEquipeCompleta = async (equipeId) => {
  const [equipe] = await db.execute(
    `SELECT * FROM equipes WHERE id = ?`,
    [equipeId]
  );

  const [membros] = await db.execute(
    `SELECT u.id, u.nome, u.email
     FROM equipes_membros em
     JOIN users u ON u.id = em.aluno_id
     WHERE em.equipe_id = ?`,
    [equipeId]
  );

  return {
    ...equipe[0],
    membros
  };
};