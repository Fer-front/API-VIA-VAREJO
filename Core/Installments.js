const TOTAL_WITHOUT_INTEREST = 6;
const DECIMAL_FIXED = 2;
const INTEREST = 1.15;

class Installments {
  static calculate(amount, qtd, tax = INTEREST) {
    return qtd > TOTAL_WITHOUT_INTEREST
      ? ((amount + amount * tax) / qtd).toFixed(DECIMAL_FIXED)
      : (amount / qtd).toFixed(DECIMAL_FIXED);
  }

  static list(valorParcelado, qtdeParcelas) {
    const result = [];

    if (valorParcelado > 0) {
      for (var parc = 1; parc <= qtdeParcelas; parc++) {
        result.push(Installments.calculate(valorParcelado, qtdeParcelas));
      }
      return result;
    }
  }

  static factoryDataInstallments(parc, amount) {
    return {
      numeroParcela: parc,
      valor: amount,
      taxaJurosAoMes: parc > TOTAL_WITHOUT_INTEREST ? INTEREST : 0,
    };
  }
}

module.exports = Installments;
