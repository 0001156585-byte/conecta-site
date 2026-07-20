const db = require("../config/db");

exports.indicadores = async () => {

    const [[usuarios]] = await db.execute(
        "SELECT COUNT(*) total FROM users"
    );

    const [[turmas]] = await db.execute(
        "SELECT COUNT(*) total FROM turmas"
    );

    const [[empresas]] = await db.execute(
        "SELECT COUNT(*) total FROM empresas"
    );

    const [[certificados]] = await db.execute(
        "SELECT COUNT(*) total FROM certificados"
    );

    const [projetos] = await db.execute(`
        SELECT status,
               COUNT(*) quantidade
        FROM projetos
        GROUP BY status
    `);

    return {
        usuarios: usuarios.total,
        turmas: turmas.total,
        empresas: empresas.total,
        certificados: certificados.total,
        projetos
    };

};