const express = require("express");
const testeRouter = express.Router();

testeRouter.get("/sale", (req, res) => {
  res.send("pagina de venda  ===>");
});

testeRouter.get("/pay", (req, res) => {
  res.send("pagina de pagamento ===>");
});

module.exports = testeRouter;
