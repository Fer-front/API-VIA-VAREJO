const express = require("express");
const cartRouter = express.Router();

const Installments = require("../Core/Installments");
const Product = require("../Core/Product");
const Payment = require("../Core/Payment");
const SelicApi = require("../Api/Selic");

cartRouter.post("/", async (req, res) => {
  try {
    console.log(req.body.produto);
    const { produto, condicaoPagamento } = req.body;
    const prod = Product.validate(produto);

    if (!prod.status) {
      res.status(404).json({
        error: [
          "Produto enviado não esta no padrao esperado!",
          ...prod.error
            .map((err) => err.toString())
            .filter((label) => label.length > 0),
        ],
      });
      return console.error(prod.error);
    }

    const pay = Payment.validate(condicaoPagamento, produto.valor);

    if (!pay.status) {
      res.status(404).json({
        error: [
          "Erro nos dados do pagamento",
          ...pay.error
            .map((err) => err.toString())
            .filter((label) => label.toString().length > 0),
        ],
      });

      return console.error(pay.error);
    }

    const { valor: valorProd } = produto;
    const { valorEntrada, qtdeParcelas } = condicaoPagamento;

    const valorParcelado = valorProd - valorEntrada;
    console.log(valorParcelado);

    const SELIC = await SelicApi.init();
    const parcelas = [];

    for (let parc = 1; parc <= qtdeParcelas; parc++) {
      parcelas.push(Installments.calculate(valorParcelado, parc, SELIC));
    }

    res.status(200).json({
      parcelas: parcelas.map((v, i) =>
        Installments.factoryDataInstallments(v, i + 1, SELIC),
      ),
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = cartRouter;
