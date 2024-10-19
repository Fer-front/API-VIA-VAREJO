const Installments = require("../Core/Installments");
const Product = require("../Core/Product");
const Payment = require("../Core/Payment");
const SelicApi = require("../Api/Selic");

async function handleInstallments(produto, condicaoPagamento) {
  try {
    const { valor: valorProd } = produto;
    const { valorEntrada, qtdeParcelas } = condicaoPagamento;

    const valorParcelado = valorProd - valorEntrada;

    const SELIC = await SelicApi.init();
    const parcelas = [];

    for (let parc = 1; parc <= qtdeParcelas; parc++) {
      const installmet = Installments.calculate(valorParcelado, parc, SELIC);
      parcelas.push(
        Installments.factoryDataInstallments(installmet, parc, SELIC),
      );
    }

    return parcelas;
  } catch (e) {
    return e;
  }
}

class SaleController {
  constructor() {}

  async send(req, res) {
    try {
      const { produto, condicaoPagamento } = req.body;

      Product.validate(produto);
      Payment.validate(condicaoPagamento, produto.valor);

      const parcelas = await handleInstallments(produto, condicaoPagamento);

      res.status(200).json({ parcelas: parcelas });
    } catch (e) {
      res.status(400).json({ status: 500, message: e });
    }
  }
}

module.exports = SaleController;
