const selic = require("selic");
const SelicFile = require("../Core/SelicFile");
// verificar se possui json com dado da selic.
// esse json deve ter o valor da taxa e dada de escrit.
const selicFile = new SelicFile();

async function init() {
  let dataSelic;

  if (await selicFile.hasFile()) {
    console.log("tem arquivo ====> ");
    const result = await selicFile.value();

    if (result.isValid) {
      console.log("tem arquivo e e valido ====> ");
      return Promise.resolve(result.value);
    } else {
      console.log("arquivo nao valido ====> ");

      dataSelic = await selic.getSelicRate();
      selicFile.create(dataSelic);
      return Promise.resolve(dataSelic);
    }
  } else {
    console.log("nao tem arquivo ====> ");

    dataSelic = await selic.getSelicRate();
    selicFile.create(dataSelic);
    return Promise.resolve(dataSelic);
  }
}

module.exports = {
  init,
};
