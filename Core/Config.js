module.exports = {
  PAYMENT: {
    PROPS: ["valorEntrada", "qtdeParcelas"],
    INSTALLMENT: { MIN: 0, MAX: 32 },
  },
  PRODUCT: {
    PROPS: ["codigo", "nome", "valor"],
    MIN_MAX_CHAR_CODE: 5,
    NAME: { MIN_CHAR: 5, MAX_CHAR: 120 },
  },
  INSTALLMENTS: {
    TOTAL_WITHOUT_INTEREST: 6,
    DECIMAL_FIXED: 2,
    INTEREST: 1.15,
  },
};
