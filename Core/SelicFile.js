const fs = require("fs");

const { writeFileSync, readFileSync, existsSync, unlinkSync } = fs;

function currentDate() {
  const _date = new Date();
  return `${_date.getDay()}/${_date.getMonth() + 1}/${_date.getFullYear()}`;
}

class SelicFile {
  constructor() {
    this.path = "Assets/";
    this.fileName = "selic.json";
    this.fullPath = `${this.path}${this.fileName}`;
    this.currentDate = currentDate();
  }

  async create(value) {
    if (await this.hasFile()) await unlinkSync(this.fullPath);

    const data = JSON.stringify({
      created: this.currentDate,
      value: value,
    });

    const result = await writeFileSync(this.fullPath, data, {
      encoding: "utf8",
      flag: "w",
    });
    return result;
  }

  async hasFile() {
    return await existsSync(this.fullPath);
  }

  async value() {
    try {
      const data = await readFileSync(this.fullPath, {
        encoding: "utf8",
        flag: "r",
      });

      const { created, value } = JSON.parse(data);

      return {
        isValid: created === this.currentDate,
        value,
      };
    } catch (err) {
      return {
        isValid: false,
        value: "file not found!",
      };
    }
  }
}

module.exports = SelicFile;
