const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const authController = require("../controllers/authController");
const validar = require("../middlewares/validationMiddleware");

router.post(
  "/register",

  body("email").isEmail().withMessage("Email inválido"),
  body("senha").isLength({ min: 6 }).withMessage("Senha fraca"),

  validar,

  authController.register
);

module.exports = router;