const selic = require("selic");
const SelicFile = require("../Core/SelicFile");
// verificar se possui json com dado da selic.
// esse json deve ter o valor da taxa e dada de escrit.
const selicFile = new SelicFile();

async function init() {
  let dataSelic;

  if (await selicFile.hasFile()) {
    const result = await selicFile.value();

    if (result.isValid) {
      return Promise.resolve(result.value);
    } else {
      dataSelic = await selic.getSelicRate();
      selicFile.create(dataSelic);
      return Promise.resolve(dataSelic);
    }
  } else {
    dataSelic = await selic.getSelicRate();
    selicFile.create(dataSelic);
    return Promise.resolve(dataSelic);
  }
}

module.exports = {
  init,
};
