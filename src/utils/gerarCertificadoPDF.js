const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");

async function gerarCertificadoPDF(projetoId) {

    // Busca informações do projeto e do aluno
    const [dados] = await db.execute(`
        SELECT
            p.id AS projeto_id,
            u.id AS aluno_id,
            u.nome
        FROM projetos p
        JOIN equipes e ON p.equipe_id = e.id
        JOIN equipes_membros em ON e.id = em.equipe_id
        JOIN users u ON em.aluno_id = u.id
        WHERE p.id = ?
        LIMIT 1
    `, [projetoId]);

    if (dados.length === 0) {
        throw new Error("Projeto não encontrado.");
    }

    const aluno = dados[0];

    const pasta = path.join(process.cwd(), "certificados");

    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta);
    }

    const nomeArquivo = `certificado_${aluno.aluno_id}.pdf`;
    const caminhoCompleto = path.join(pasta, nomeArquivo);

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(caminhoCompleto));

    doc.fontSize(26)
       .text("CERTIFICADO", {
            align: "center"
       });

    doc.moveDown(2);

    doc.fontSize(16)
       .text(`Certificamos que ${aluno.nome}`, {
            align: "center"
       });

    doc.moveDown();

    doc.text("concluiu com sucesso o desafio do ConectaEPT.", {
        align: "center"
    });

    doc.moveDown();

    doc.text(`Projeto Nº ${projetoId}`, {
        align: "center"
    });

    doc.moveDown(3);

    doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, {
        align: "center"
    });

    doc.end();

    await db.execute(`
        INSERT INTO certificados
        (projeto_id, aluno_id, caminho_pdf)
        VALUES (?,?,?)
    `, [
        projetoId,
        aluno.aluno_id,
        `certificados/${nomeArquivo}`
    ]);

    return caminhoCompleto;
}

module.exports = {
    gerarCertificadoPDF
};