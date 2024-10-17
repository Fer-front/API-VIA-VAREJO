const selic = require("selic");
const SelicFile = require("../Core/SelicFile");

const selicFile = new SelicFile();

async function init() {
  const result = await selicFile.value();
  const hasFile = await selicFile.hasFile();

  if (!hasFile || !result.isValid) {
    const dataSelic = await selic.getSelicRate();
    selicFile.create(dataSelic);

    result.isValid = true;
    result.value = dataSelic;
  }

  return Promise.resolve(result.value);
}

module.exports = {
  init,
};
