const db = require("../config/db");

exports.findByEquipe = async (equipeId) => {
  const [rows] = await db.execute(
    `SELECT * FROM projetos WHERE equipe_id = ?`,
    [equipeId]
  );

  return rows[0];
};

exports.create = async (equipeId) => {
  const [result] = await db.execute(
    `INSERT INTO projetos (equipe_id, status)
     VALUES (?, 'EM_ANDAMENTO')`,
    [equipeId]
  );

  return {
    id: result.insertId,
    equipeId
  };
};

exports.submeter = async (projetoId) => {
  await db.execute(
    `UPDATE projetos
     SET status = 'SUBMETIDO',
         submetido_em = NOW()
     WHERE id = ?`,
    [projetoId]
  );
};

exports.updateStatus = async (id, status) => {
  await db.execute(
    "UPDATE projetos SET status = ? WHERE id = ?",
    [status, id]
  );
}; 