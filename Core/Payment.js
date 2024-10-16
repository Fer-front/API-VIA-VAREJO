const validate = require("../Utils/Validate");
const { PAYMENT } = require("./Config");

const { INSTALLMENT, PROPS } = PAYMENT;

class Payment {
  constructor() {}

  static validate(pay, totalSale) {
    const hasProps = validate(pay).hasProps(PROPS).exec();

    if (!hasProps.status) return hasProps.error;

    const entrada = validate(pay.valorEntrada)
      .isPositive()
      .isMinorEqual(totalSale)
      .exec();

    const parc = validate(pay.qtdeParcelas)
      .isMajorEqual(INSTALLMENT.MIN)
      .isMinorEqual(INSTALLMENT.MAX)
      .exec();

    return !entrada.status || !parc.status
      ? {
          error: [...entrada.error, ...parc.error],
          status: false,
        }
      : { error: [], status: true };
  }
}

module.exports = Payment;
