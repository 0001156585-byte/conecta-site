const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
    try {

        const { nome, email, senha, tipo } = req.body;

        const usuarioExistente = await User.findByEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({
                message: "E-mail já cadastrado"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await User.create(nome, email, senhaHash, tipo);

        res.status(201).json({
            message: "Usuário cadastrado com sucesso"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

exports.login = async (req, res) => {
    try {

        const { email, senha } = req.body;

        const usuario = await User.findByEmail(email);

        if (!usuario) {
            return res.status(401).json({
                message: "Usuário não encontrado."
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaValida) {
            return res.status(401).json({
                message: "Senha inválida."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login realizado com sucesso.",
            token
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};
