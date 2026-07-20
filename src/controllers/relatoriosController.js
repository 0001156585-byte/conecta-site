const relatorios = require("../queries/relatoriosQueries");
const PDFDocument = require("pdfkit");
const db = require("../config/db");


// RF-15 - Dashboard
exports.dashboard = async(req,res)=>{

    try{

        const desafios =
            await relatorios.totalDesafios();

        const equipes =
            await relatorios.totalEquipes();

        const projetos =
            await relatorios.totalProjetos();

        const media =
            await relatorios.mediaAvaliacoes();


        res.json({

            desafios,
            equipes,
            projetos,
            media

        });


    }catch(error){

        res.status(500).json({
            erro:error.message
        });

    }

};



// RF-16 - Relatório PDF da empresa

exports.relatorioEmpresaPDF = async(req,res)=>{

    try{

        const empresaId = req.params.id;


        const [empresa] = await db.execute(
            `
            SELECT nome_fantasia, cnpj, setor
            FROM empresas
            WHERE id = ?
            `,
            [empresaId]
        );


        const [desafios] = await db.execute(
            `
            SELECT titulo, status
            FROM desafios
            WHERE empresa_id = ?
            `,
            [empresaId]
        );


        if(empresa.length === 0){

            return res.status(404).json({
                erro:"Empresa não encontrada"
            });

        }


        const doc = new PDFDocument();


        res.setHeader(
            "Content-Type",
            "application/pdf"
        );


        res.setHeader(
            "Content-Disposition",
            "attachment; filename=relatorio_empresa.pdf"
        );


        doc.pipe(res);


        doc.fontSize(20)
        .text("Relatório da Empresa - ConectaEPT");


        doc.moveDown();


        doc.fontSize(14)
        .text(
            `Empresa: ${empresa[0].nome_fantasia}`
        );


        doc.text(
            `CNPJ: ${empresa[0].cnpj || "Não informado"}`
        );


        doc.text(
            `Setor: ${empresa[0].setor}`
        );


        doc.moveDown();


        doc.text("Desafios cadastrados:");

        desafios.forEach((desafio)=>{

            doc.text(
                `${desafio.titulo} - ${desafio.status}`
            );

        });


        doc.end();


    }catch(error){

        console.log(error);

        res.status(500).json({
            erro:error.message
        });

    }

};