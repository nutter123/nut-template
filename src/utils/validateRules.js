const MOBILE = (rule, value, callback) => {
  var reg = /^((13[0-9])|(145)|(15[0-3])|(15[5-9])|(170)|(173)|(17[5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
  if (value && value.length > 0) {
    if (value != "" && !reg.test(value)) {
      callback(new Error("请输入正确的手机号码"));
    } else {
      callback();
    }
    callback();
  } else {
    callback(new Error("请输入手机号码"));
  }
};
const PHONE = (rule, value, callback) => {
  var points = /^\d{7,12}$/;
  if (value != "" && !points.test(value)) {
    callback(new Error("请输入正确的联系号码"));
  } else {
    callback();
  }
};
const EMAIL = (rule, value, callback) => {
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value != "" && !reg.test(value)) {
    callback(new Error("请输入正确格式的邮箱"));
  } else {
    callback();
  }
};

const CUR_DATE_LIMIT = (rule, value, callback) => {
  if (typeof value == "object" && new Date().valueOf() <= value.valueOf()) {
    callback(new Error("不能选将来时间"));
  } else {
    callback();
  }
};

const POINT_LIMIT = (rule, value, callback) => {
  var points = /^\d{1,7}(\.\d{1,2})?$/;
  if (value && value != "" && !points.test(value)) {
    callback(new Error("整数小于7位且小数点不能超过两位"));
  } else {
    callback();
  }
};

const VALIDATE_ID_CARD = (rule, value, callback) => {
  var points = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/;
  if (value != null && value != "" && !points.test(value)) {
    callback(new Error("身份证号码格式有误"));
  } else {
    callback();
  }
};
const CARGO_SECTION = (rule, value, callback, source) => {
  if (!source.c_name || rule.field != rule.file) {
    callback();
    return;
  }

  if (value == "") {
    callback(new Error("该字段不能为空"));
  } else {
    callback();
  }
  return false;
};
const arrayIsEmpty = (rule, value, callback) => {
  console.log(value);
  if (value && !value.length) {
    callback(new Error("至少选择一项"));
  } else {
    callback();
  }
};

const REQUIRED = ({ message = "不能为空", trigger = "blur" } = {}) => {
  return {
    required: true,
    message: message,
    trigger: trigger,
  };
};
const MAX = ({
  type = "string",
  message = "不能多于1位",
  trigger = "blur",
  max = 1,
} = {}) => {
  return {
    type: type,
    max: max,
    message: message,
    trigger: trigger,
  };
};
const MIN = ({
  type = "string",
  message = "不能少于1位",
  trigger = "blur",
  min = 1,
} = {}) => {
  return {
    type: type,
    min: min,
    message: message,
    trigger: trigger,
  };
};

export default {
  idCard: VALIDATE_ID_CARD,
  mobile: MOBILE,
  phone: PHONE,
  required: REQUIRED,
  max: MAX,
  min: MIN,
  email: EMAIL,
  pointLimit: POINT_LIMIT,
  cargoSection: CARGO_SECTION,
  curDateLimit: CUR_DATE_LIMIT,
  arrayIsEmpty,
};
