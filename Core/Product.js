const validate = require("../Utils/Validate");
const Sanitizate = require("../Utils/Sanitizate");

const { PRODUCT } = require("./Config");
const { PROPS, MIN_MAX_CHAR_CODE, NAME } = PRODUCT;

class Product {
  constructor() {}

  static validate(prod) {
    const hasProps = validate(prod).hasProps(PROPS).exec();
    if (!hasProps.status) return hasProps.error;

    const isValidAmout = validate(prod.valor).isPositive().isMoney().exec();
    const isValidCode = validate(prod.codigo)
      .isPositive()
      .minMaxChar(MIN_MAX_CHAR_CODE, MIN_MAX_CHAR_CODE)
      .exec();

    const isValidName = validate(prod.nome)
      .minMaxChar(NAME.MIN_CHAR, NAME.MAX_CHAR)
      .exec();

    return !isValidCode.status || !isValidName.status || !isValidAmout.status
      ? {
          error: [
            ...isValidCode.error,
            ...isValidName.error,
            ...isValidAmout.error,
          ],
          status: false,
        }
      : { error: [], status: true };
  }
}

module.exports = Product;
