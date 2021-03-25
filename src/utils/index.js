export * from "./util.js";
import moment from "moment";
import profile from "@/config";

/**
 * fmt
 */
const fmtOptions = {
  // 日期格式化
  date: {
    format: "yyyy-MM-dd hh:mm:ss",
  },
  // 货币格式化
  currency: {
    places: 2,
    symbol: "￥",
    thousand: ", ",
    decimal: ".",
  },
};

export let fmt = {
  /**
   * 格式化日期
   * @param {any} date
   * @param {string} [format='yyyy-MM-dd hh:mm:ss']
   * @returns
   */
  date(date, format = fmtOptions.date.format) {
    if (!date) {
      return date;
    } else if (/^\d+$/.test(date)) {
      // java格式的timestamp
      return fmt.dateFormat(new Date(date), format);
    } else if (typeof date === "object" && date.time) {
      // java格式的日期object
      return fmt.dateFormat(new Date(date.time), format);
    } else if (/date/i.test(date)) {
      // .net格式的timestamp
      return fmt.dateFormat(new Date(date.match(/\d+/)[0]), format);
    } else if (date && typeof date === "string" && /\.\d$/.test(date)) {
      // mysql字符串格式转化
      return fmt.dateFormat(
        new Date(date.replace(/\.\d$/, "").replace(/-/g, "/")),
        format
      );
    }
    return date;
  },
  /**
   * 格式化日期
   * @param {any} date
   * @param {any} format
   * @returns
   */
  dateFormat(date, format) {
    let o = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds(), // millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  },
  /**
   * 货币格式化
   * @param {any} money
   * @param {string} [opt={
   *             olaces: 2,
   *             symbol: '￥',
   *             thousand: ', ',
   *             decimal: '.'
   *         }]
   * @returns
   */
  currency(money, opt) {
    opt = Object.assign({}, fmtOptions.currency, opt);
    let number = money;
    let negative = number < 0 ? "-" : "";
    let i =
      parseInt((number = Math.abs(+number || 0).toFixed(opt.places)), 10) + "";
    let l = i.length;
    let j = l > 3 ? l % 3 : 0;
    return (
      opt.symbol +
      negative +
      (j ? i.substr(0, j) + opt.thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + opt.thousand) +
      (opt.places
        ? opt.decimal +
          Math.abs(number - i)
            .toFixed(opt.places)
            .slice(2)
        : "")
    );
  },
  /**
   * 取对象的值
   * @param {any} obj
   * @param {any} key
   * @param {any} defaultValue
   * @returns
   */
  value(key, obj, defaultValue) {
    if (defaultValue == null) {
      defaultValue = "";
    }
    if (typeof key === "object") {
      key = arguments[1];
      obj = arguments[0];
    }
    obj = obj || {};
    var value = obj[key];
    return value == null ? defaultValue : value;
  },
  /**
   * 返回图片URL的绝对路径
   * @param {any} url
   * @returns
   */
  url(url) {
    return /^[http|/]/.test(url) ? url : profile.imgDomain + url;
  },
  /**
   * 取对象深层属性的值
   * @param {any} propStr
   * @param {any} obj
   * @param {string} [defaultValue='']
   * @returns
   */
  prop(propStr, obj, defaultValue = "") {
    if (typeof propStr !== "string") {
      propStr = arguments[1];
      obj = arguments[0];
    }
    let props = propStr.split(".");
    let target = obj || {};
    for (let i = 0, l = props.length; i < l; i++) {
      if ((target = target[props[i]]) == null) {
        return defaultValue;
      }
    }
    return target;
  },
  /**
   * 转时间戳除以1000
   *
   * @param {any} string
   * @returns
   */
  getTime(string) {
    let date = new Date(string);
    let floorDate = Math.floor(date.getTime());
    return floorDate;
  },
};

// webpack require.context 转为数组包装函数
// export 使用 default
export const requireContentArray = (r, exinclude) => {
  let contents = [];
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) == -1;
  });
  for (let p of paths) {
    let fn = r(p).default ? r(p).default : r(p);
    if (fn instanceof Array) {
      contents = [...contents, ...fn];
    } else if (fn instanceof Object) {
      contents.push(fn);
    }
  }
  return contents;
};

// webpack require.context 转为对象包装函数
export const requireContentObject = (r, exinclude) => {
  let contents = {};
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) == -1;
  });
  for (let p of paths) {
    let fn = r(p).default ? r(p).default : r(p);
    let k = p.match(/(\w+-?\w+).js$/)[1];
    contents[k] = fn;
  }
  return contents;
};

export const requireContentFolderObj = (r, exinclude) => {
  let contents = {};
  const paths = r.keys().filter((p) => {
    return exinclude.indexOf(p) == -1;
  });
  for (let path of paths) {
    let pArray = path.split("/").slice(1),
      l = pArray.length,
      fn = r(path).default || r(path),
      utilObj = contents;
    pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1];

    for (let i = 0; i < l; i++) {
      let p = pArray[i];
      if (i < l - 1) {
        if (!contents[p]) {
          contents[p] = {};
        }
        utilObj = contents[p];
      } else if (i == l - 1) {
        utilObj[p] = fn;
      }
    }
  }
  return contents;
};
export const eachOwn = (obj, fn) => {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(obj[key], key, obj);
    }
  }
};

export const lazyComponent = (name, index = false) => () =>
  import(`@/views/${name}${index ? "/index" : ""}.vue`);

export const removeEmpty = (data) => {
  eachOwn(data, (value, key, data) => {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      delete data[key];
    }
  });
  return data;
};

export const getPassTimeArea = (days) => {
  let begin, end;
  end = moment().format("YYYY-MM-DD 23:59:59");
  begin = moment().add("days", -days).format("YYYY-MM-DD 00:00:00");
  return {
    beginDate: fmt.getTime(begin),
    endDate: fmt.getTime(end),
  };
};

export const formatDate = (date, type) => {
  let time;
  if (type == "begin") {
    time = moment(date).format("YYYY-MM-DD 00:00:00");
  } else {
    time = moment(date).format("YYYY-MM-DD 23:59:59");
  }
  return time;
};
export const getDates = (_startDate, _stopDate) => {
  let dateArray = [];
  let currentDate = moment(_startDate);
  let stopDate = moment(_stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};
