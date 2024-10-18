function formatPtBR(day, month, year) {
  return `${day}/${month}/${year}`;
}

class Datez {
  constructor() {
    this._date = new Date();
  }

  get currentDay() {
    return {
      format_br: formatPtBR(
        this._date.getDate(),
        this._date.getMonth() + 1,
        this._date.getFullYear(),
      ),
      format_second: this._date.getTime(),
    };
  }

  get yesterDay() {
    const _yesterday = new Date(this._date.setDate(this._date.getDate() - 1));

    return {
      format_br: formatPtBR(
        _yesterday.getDate(),
        _yesterday.getMonth() + 1,
        _yesterday.getFullYear(),
      ),
      format_second: _yesterday.getTime(),
    };
  }
}

module.exports = Datez;
