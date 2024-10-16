const validate = require("./Utils/Validate");
const Installments = require("./Core/Installments");
const Product = require("./Core/Product");
const Payment = require("./Core/Payment");

const express = require("express");
const App = express();

App.use(express.json());

App.post("/cart", (req, res) => {
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

    // calcular o valor das parcelas

    const SELIC = 1.15;
    const { valor: valorProd } = produto;
    const { valorEntrada, qtdeParcelas } = condicaoPagamento;

    const valorParcelado = valorProd - valorEntrada;
    console.log(valorParcelado);
    let result = Installments.list(valorParcelado, qtdeParcelas).map(
      (v, index) => Installments.factoryDataInstallments(index + 1, v),
    );

    // valor da compra - valor entrada / qtdeParcelas

    // se valor de entrada for igual a valor de compra zerar desabilitqtdeParcelas

    // se adicionar taxa selic acima de 6 parcelas

    res.status(200).json({
      parcelas: result,
    });
  } catch (e) {
    console.log(e);
  }
});

App.listen(3000, () => console.log("server"));
