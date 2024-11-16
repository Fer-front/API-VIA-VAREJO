const validate = require("../Utils/Validate");
const { PAYMENT } = require("./Config");

const { INSTALLMENT, PROPS } = PAYMENT;

class Payment {
  constructor() {}

  static validate(pay, totalSale) {
    try {
      const hasProps = validate(pay)
        .hasProps(PROPS)
        .exec();
        
      const entrada = validate(pay.valorEntrada)
        .isPositive()
        .isMinorEqual(totalSale)
        .exec();

      const parc = validate(pay.qtdeParcelas)
        .isMajorEqual(INSTALLMENT.MIN)
        .isMinorEqual(INSTALLMENT.MAX)
        .exec();

    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Payment;
