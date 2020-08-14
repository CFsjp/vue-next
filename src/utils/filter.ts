/**
 * 对8位的日期字符串，用连接符unit进行格式和
 * @param date - 日期字符串，长度为8，如20200202
 * @param unit - 连接符,默认为 .
 * @return 返回格式化后的字符串
 */
function timeFormat(date: string, unit = "."): string {
  if (date !== undefined && date.length === 8) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    if (unit === undefined) {
      unit = "-";
    }
    if (unit === "ch") {
      return (
        parseInt(year) + "年" + parseInt(month) + "月" + parseInt(day) + "日"
      );
    } else {
      return `${year}${unit}${month}${unit}${day}`;
    }
  } else {
    return date;
  }
}

/**
 * 返回日期的月日
 * @param date - 日期字符串，长度为8，如20200202
 * @param unit - 连接符,默认为 .
 * @return 返回格式化后的字符串
 */
function getMonthDay(date: string, unit = "."): string {
  if (date !== undefined && date.length === 8) {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${month}${unit}${day}`;
  } else {
    return date;
  }
}

/**
 * 金钱格式化
 * @param val - 格式化前的字符串
 * @param length - 保留的小数位数
 * @return 返回格式化后的字符串
 */
function moneyFormat(val: string, length: number): string {
  if (val) {
    return val;
  }
  if (length === 0) {
    val = parseInt(val).toString();
  } else if (length && !isNaN(Number(length))) {
    // 将 val 转换为小数位数为 length 的 float 型
    const number = Number(val);
    const numberLength =
      Math.round(number * Math.pow(10, length)) / Math.pow(10, length);
    val = numberLength.toFixed(length);
  }
  if (val) {
    val = val + "";
    const array = val.trim().split(".");
    const num = array[0];
    num.replace(/(\d)(?=(\d{3}$))/g, "$1,");
    if (num.match(/^([0-9]|[-+])[0-9,]*$/)) {
      if (array.length > 1) {
        return num.replace(/(\d)(?=(\d{3}$))/g, "$1,") + "." + array[1];
      } else {
        return num.replace(/(\d)(?=(\d{3}$))/g, "$1,");
      }
    } else {
      return "0.00";
    }
  } else {
    return "0.00";
  }
}

/**
 * 字符串掩码
 * @param val - 格式化前的字符串
 * @param type - account:账号，card:银行卡
 * @return 返回格式化后的字符串
 */
function maskFormat(value: string, type = "account"): string {
  let text = "";
  switch (type) {
    case "account":
      const length = value.length;
      switch (length) {
        case 11:
          text = value.replace(
            new RegExp("(\\d{3})(\\d{4})(\\d{4})"),
            "$1****$3"
          );
          break;
        case 15:
          text = value.replace(
            new RegExp("(\\d{4})(\\d{7})(\\d{4})"),
            "$1*******$3"
          );
          break;
        case 18:
          text = value.replace(
            new RegExp("(\\d{4})(\\d{10})(\\d{4})"),
            "$1**********$3"
          );
          break;
        default:
          text = value;
      }
      break;
    case "card":
      text = value.replace(
        new RegExp("(\\d{4})(\\d{4})(\\d{4})(\\d{4})"),
        "**** **** **** $4"
      );
      break;
  }
  return text;
}

module.exports = {
  timeFormat,
  getMonthDay,
  moneyFormat,
  maskFormat
};
