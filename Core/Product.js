const validate = require("../Utils/Validate");

const { PRODUCT } = require("./Config");
const { PROPS, MIN_MAX_CHAR_CODE, NAME } = PRODUCT;

class Product {
  constructor() {}

  static validate(prod) {
    try {
      const hasProps = validate(prod)
        .hasProps(PROPS)
        .exec();

      const isValidAmout = validate(prod.valor)
        .isPositive()
        .isMoney()
        .exec();

      const isValidCode = validate(prod.codigo)
        .isPositive()
        .minMaxChar(MIN_MAX_CHAR_CODE, MIN_MAX_CHAR_CODE)
        .exec();

      const isValidName = validate(prod.nome)
        .minMaxChar(NAME.MIN_CHAR, NAME.MAX_CHAR)
        .exec();
        
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Product;
