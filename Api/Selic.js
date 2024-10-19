const SelicFile = require("../Core/SelicFile");
const Datez = require("../Utils/Datez");

const selicFile = new SelicFile();
const datez = new Datez();

async function fetchSelic(dateInit, dateFinal) {
  try {
    const endpoint = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${dateInit}&dataFinal=${dateFinal}`;

    const res = await fetch(endpoint);
    return await res.json();
  } catch (err) {
    return err;
  }
}

async function init() {
  const result = await selicFile.value();
  const hasFile = await selicFile.hasFile();

  if (!hasFile || !result.isValid) {
    const yesterday = datez.yesterDay.format_br;
    const [selic] = await fetchSelic(yesterday, yesterday);

    selicFile.create(selic.valor);

    result.isValid = true;
    result.value = selic.valor;
  }

  return Promise.resolve(result.value);
}

module.exports = {
  init,
};
