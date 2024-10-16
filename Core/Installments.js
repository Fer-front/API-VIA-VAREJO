const { INSTALLMENTS } = require("./Config");
const { DECIMAL_FIXED, INTEREST, TOTAL_WITHOUT_INTEREST } = INSTALLMENTS;

class Installments {
  static calculate(amount, qtd, tax = INTEREST) {
    return qtd > TOTAL_WITHOUT_INTEREST
      ? ((amount + (amount * tax) / 100) / qtd).toFixed(DECIMAL_FIXED)
      : (amount / qtd).toFixed(DECIMAL_FIXED);
  }

  static factoryDataInstallments(amount, parc, tax) {
    return {
      valor: amount,
      numeroParcela: parc,
      taxaJurosAoMes: parc > TOTAL_WITHOUT_INTEREST ? tax : 0,
    };
  }
}

module.exports = Installments;
