// validar tipo
const REGEX = {
  UPPER: /[A-Z]/g,
  LOWER: /[a-z]/g,
};
function Validate(value) {
  const ERRORS = [];

  const val = {
    isInt() {
      if (!(typeof value === "number" && value % 2 === 0)) {
        ERRORS.push(new Error(" valor não é um numero ou um inteiro!"));
      }
      return val;
    },

    isFloat() {
      if (!(typeof value === "number" && value % 2 !== 0)) {
        ERRORS.push(new Error(" valor não é um numero ou um float!"));
      }
      return val;
    },

    isMoney() {
      if (!(typeof value === "number" && val.isFloat(value))) {
        ERRORS.push(new Error(" valor não é um numero ou um valor monetario!"));
      }
      return val;
    },

    isPositive() {
      if (!(typeof value === "number" && value > 0)) {
        ERRORS.push(new Error(" valor não é um numero ou numero positivo!"));
      }
      return val;
    },

    isNegative() {
      if (!(typeof value === "number" && value < 0)) {
        ERRORS.push(new Error(" valor não é um numero ou um numero negativo!"));
      }
      return val;
    },

    isMajor(num) {
      if (!(typeof value === "number" && value > num)) {
        ERRORS.push(new Error(` valor deve ser maior que [ ${num} ] !`));
      }
      return val;
    },

    isMinor(num) {
      if (!(typeof value === "number" && value < num)) {
        ERRORS.push(new Error(` valor deve ser menor que [ ${num} ] !`));
      }
      return val;
    },

    isMinorEqual(num) {
      if (!(typeof value === "number" && value <= num)) {
        ERRORS.push(new Error(` valor deve ser menor ou igual a [ ${num} ] !`));
      }
      return val;
    },

    isMajorEqual(num) {
      if (!(typeof value === "number" && value >= num)) {
        ERRORS.push(new Error(` valor deve ser menor ou igual a [ ${num} ] !`));
      }
      return val;
    },

    isEmpty() {
      if (!(typeof value === "string" && value.length === 0)) {
        ERRORS.push(new Error(" valor deve ser uma string vazia!"));
      }
      return val;
    },

    isUpperCase() {
      if (!REGEX.UPPER.test(value)) {
        ERRORS.push(new Error(" Todos os caracter devem ser maiusculos!"));
      }
    },

    isLowerCase() {
      if (!REGEX.LOWER.test(value)) {
        ERRORS.push(new Error(" Todos os caracter devem ser minusculo!"));
      }
      return val;
    },

    hasUpperCase() {
      if (!REGEX.UPPER.test(value)) {
        ERRORS.push(new Error(" Deve conster caracter maiusculo!"));
      }
    },

    hasLowerCase() {
      if (!REGEX.LOWER.test(value)) {
        ERRORS.push(new Error(" Deve conter caracter minusculos!"));
      }
      return val;
    },

    maxChar(size) {
      if (!(String(value).length <= size)) {
        ERRORS.push(
          new Error(" Quantidade de caracteres superior ao esperado!"),
        );
      }
      return val;
    },

    minChar(size) {
      if (!(String(value).length >= size)) {
        ERRORS.push(
          new Error(" Quantidade de caracteres inferior ao esperado!"),
        );
      }
      return val;
    },

    minMaxChar(min, max) {
      const r = val.minChar(min).maxChar(max).exec();
      return val;
    },

    hasProps(arr) {
      const isValid = arr.every((expected) => expected in value);

      if (!isValid) {
        ERRORS.push(
          new Error(` Todas a propriedade são obrigatoria ${[...arr]}!`),
        );
      }
      return val;
    },

    exec() {
      if (ERRORS.length > 0) {
        throw ERRORS;
      }
      return true;
    },
  };

  return val;
}

module.exports = Validate;
