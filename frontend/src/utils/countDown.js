export class Countdown {
  get TIMESTAMP_SECOND() {
    return 1000;
  }
  get TIMESTAMP_MINUTE() {
    return 60 * this.TIMESTAMP_SECOND;
  }
  get TIMESTAMP_HOUR() {
    return 60 * this.TIMESTAMP_MINUTE;
  }
  get TIMESTAMP_DAY() {
    return 24 * this.TIMESTAMP_HOUR;
  }
  get TIMESTAMP_WEEK() {
    return 7 * this.TIMESTAMP_DAY;
  }
  get TIMESTAMP_MONTH() {
    return 30 * this.TIMESTAMP_DAY; // Approximate months as 30 days
  }

  constructor(userOptions) {
    this.options = {
      cont: null,
      countdown: true,
      date: {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
      },
      endCallback: null,
      outputFormat: "month|day|hour|minute", // only show these
      outputTranslation: {
        month: "Months",
        day: "Days",
        hour: "Hours",
        minute: "Minutes",
      },
    };

    this.lastTick = null;
    this.intervalsBySize = ["month", "day", "hour", "minute"];
    this.elementClassPrefix = "countDown__";
    this.interval = null;
    this.digitConts = {};

    this._assignOptions(this.options, userOptions);
  }

  start() {
    let date, dateData;

    this._fixCompatibility();
    date = this._getDate(this.options.date);
    dateData = this._prepareTimeByOutputFormat(date);

    this._writeData(dateData);
    this.lastTick = dateData;

    if (this.options.countdown && date.getTime() <= Date.now()) {
      this.stop();
      if (typeof this.options.endCallback === "function") {
        this.options.endCallback();
      }
    } else {
      let lastUpdate = 0;
      const tick = (timestamp) => {
        if (this.options.countdown && date.getTime() <= Date.now()) {
          this.stop();
          if (typeof this.options.endCallback === "function") {
            this.options.endCallback();
          }
          return;
        }

        if (timestamp - lastUpdate >= this.TIMESTAMP_SECOND) {
          this._updateView(this._prepareTimeByOutputFormat(date));
          lastUpdate = timestamp;
        }

        this.interval = requestAnimationFrame(tick);
      };

      this.interval = requestAnimationFrame(tick);
    }
  }

  stop() {
    cancelAnimationFrame(this.interval);
    this.interval = null;
  }

  _getDate(date) {
    if (typeof date === "object") {
      if (date instanceof Date) {
        return date;
      } else {
        let expectedValues = {
          day: 0,
          month: 0,
          year: 0,
          hour: 0,
          minute: 0,
          second: 0,
        };

        for (let i in expectedValues) {
          if (expectedValues.hasOwnProperty(i) && date.hasOwnProperty(i)) {
            expectedValues[i] = date[i];
          }
        }

        return new Date(
          expectedValues.year,
          expectedValues.month > 0
            ? expectedValues.month - 1
            : expectedValues.month,
          expectedValues.day,
          expectedValues.hour,
          expectedValues.minute,
          expectedValues.second
        );
      }
    } else if (typeof date === "number" || typeof date === "string") {
      return new Date(date);
    } else {
      return new Date();
    }
  }

  _prepareTimeByOutputFormat(dateObj) {
    let output = {};
    let diff = this._getPreciseDiff(dateObj, new Date());

    this.options.outputFormat.split("|").forEach((unit) => {
      if (diff.hasOwnProperty(unit)) {
        let value = diff[unit];
        output[unit] = (
          ("" + value).length < 2 ? "0" + value : "" + value
        ).split("");
      }
    });

    return output;
  }

  _fixCompatibility() {
    Math.trunc =
      Math.trunc ||
      function (x) {
        if (isNaN(x)) {
          return NaN;
        }
        if (x > 0) {
          return Math.floor(x);
        }
        return Math.ceil(x);
      };
  }

  _writeData(data) {
    let code = `<div class="${this.elementClassPrefix}cont">`,
      intervalName;

    for (intervalName in data) {
      if (data.hasOwnProperty(intervalName)) {
        let element = `<div class="${
            this.elementClassPrefix
          }interval_basic_cont">
                                       <div class="${this._getIntervalContCommonClassName()} ${this._getIntervalContClassName(
            intervalName
          )}">`,
          intervalDescription = `<div class="${this.elementClassPrefix}interval_basic_cont_description">
                                                   ${this.options.outputTranslation[intervalName]}
                                               </div>`;
        data[intervalName].forEach((digit, index) => {
          element += `<div class="${this._getDigitContCommonClassName()} ${this._getDigitContClassName(
            index
          )}">
                                        ${this._getDigitElementString(digit, 0)}
                                    </div>`;
        });

        code += element + "</div>" + intervalDescription + "</div>";
      }
    }

    this.options.cont.innerHTML = code + "</div>";
    this.lastTick = data;
  }

  _getDigitElementString(newDigit, lastDigit) {
    return `<div class="${this.elementClassPrefix}digit_last_placeholder">
                        <div class="${this.elementClassPrefix}digit_last_placeholder_inner">
                            ${lastDigit}
                        </div>
                    </div>
                    <div class="${this.elementClassPrefix}digit_new_placeholder">${newDigit}</div>
                    <div class="${this.elementClassPrefix}digit_last_rotate">${lastDigit}</div>
                    <div class="${this.elementClassPrefix}digit_new_rotate">
                        <div class="${this.elementClassPrefix}digit_new_rotated">
                            <div class="${this.elementClassPrefix}digit_new_rotated_inner">
                                ${newDigit}
                            </div>
                        </div>
                    </div>`;
  }

  _updateView(data) {
    for (let intervalName in data) {
      if (data.hasOwnProperty(intervalName)) {
        data[intervalName].forEach((digit, index) => {
          if (
            this.lastTick !== null &&
            this.lastTick[intervalName][index] !== data[intervalName][index]
          ) {
            this._getDigitCont(intervalName, index).innerHTML =
              this._getDigitElementString(
                data[intervalName][index],
                this.lastTick[intervalName][index]
              );
          }
        });
      }
    }

    this.lastTick = data;
  }

  _getDigitCont(intervalName, index) {
    if (!this.digitConts[`${intervalName}_${index}`]) {
      this.digitConts[`${intervalName}_${index}`] =
        this.options.cont.querySelector(
          `.${this._getIntervalContClassName(
            intervalName
          )} .${this._getDigitContClassName(index)}`
        );
    }

    return this.digitConts[`${intervalName}_${index}`];
  }

  _getIntervalContClassName(intervalName) {
    return `${this.elementClassPrefix}interval_cont_${intervalName}`;
  }

  _getIntervalContCommonClassName() {
    return `${this.elementClassPrefix}interval_cont`;
  }

  _getDigitContClassName(index) {
    return `${this.elementClassPrefix}digit_cont_${index}`;
  }

  _getDigitContCommonClassName() {
    return `${this.elementClassPrefix}digit_cont`;
  }

  _assignOptions(options, userOptions) {
    for (let i in options) {
      if (options.hasOwnProperty(i) && userOptions.hasOwnProperty(i)) {
        if (
          options[i] !== null &&
          typeof options[i] === "object" &&
          typeof userOptions[i] === "object"
        ) {
          this._assignOptions(options[i], userOptions[i]);
        } else {
          options[i] = userOptions[i];
        }
      }
    }
  }

  /**
   * Returns precise diff between two dates in months, days, hours, minutes.
   * Always returns integers ≥ 0.
   * @param {Date} targetDate
   * @param {Date} now
   */
  _getPreciseDiff(targetDate, now) {
    let years = targetDate.getFullYear() - now.getFullYear();
    let months = targetDate.getMonth() - now.getMonth() + years * 12;
    let days = targetDate.getDate() - now.getDate();
    let hours = targetDate.getHours() - now.getHours();
    let minutes = targetDate.getMinutes() - now.getMinutes();

    // Borrow units if negative
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Get days in the previous month of targetDate
      let prevMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        0
      );
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
    }

    return {
      month: months < 0 ? 0 : months,
      day: days < 0 ? 0 : days,
      hour: hours < 0 ? 0 : hours,
      minute: minutes < 0 ? 0 : minutes,
    };
  }
}

if (typeof window !== "undefined") {
  window.Countdown = Countdown;
}
