const { validationResult } = require("express-validator");

const Desafio =
    require("../models/desafioModel");

    exports.criarDesafio = async (req, res) => {

        const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
             errors: errors.array()
        });
    }

        try {
    
            // Apenas empresas podem criar desafios
            if (req.user.tipo !== "EMPRESA") {
                return res.status(403).json({
                    message: "Apenas empresas podem criar desafios."
                });
            }
    
            const {
                empresa_id,
                titulo,
                descricao,
                area,
                prazo,
                recursos
            } = req.body;
    
            const id = await Desafio.create(
                empresa_id,
                titulo,
                descricao,
                area,
                prazo,
                recursos
            );
    
            res.status(201).json({
                message: "Desafio criado com sucesso",
                id
            });
    
        } catch (error) {
    
            res.status(500).json({
                error: error.message
            });
    
        }
    
    };

exports.atualizarStatus = async (req, res) => {

    try {

        if (req.user.tipo !== "DOCENTE") {
            return res.status(403).json({
                message: "Apenas docentes podem aprovar desafios."
            });
        }

        const { id } = req.params;

        const { status } = req.body;

        await Desafio.updateStatus(id, status);

        res.json({
            message: "Status atualizado"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.listarDesafios = async (req, res) => {

    try {

        if (req.user.tipo !== "ALUNO") {
            return res.status(403).json({
                message: "Apenas alunos podem visualizar os desafios."
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const desafios = await Desafio.findAbertos(
            page,
            limit
        );

        res.json(desafios);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

exports.associarTurma = async (req, res) => {

    try {

        // Apenas docentes podem associar desafios às turmas
        if (req.user.tipo !== "DOCENTE") {
            return res.status(403).json({
                message: "Apenas docentes podem associar desafios às turmas."
            });
        }

        const { desafioId } = req.params;
        const { turmaId } = req.body;

        await Desafio.associarTurma(
            desafioId,
            turmaId
        );

        res.json({
            message: "Turma associada"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};