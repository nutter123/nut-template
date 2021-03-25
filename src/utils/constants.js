const ruleCollections = {
  noZh: () => {
    return [
      {
        validator: noZh,
        trigger: "blur",
      },
    ];
  },
  phone: () => {
    return [
      {
        required: true,
        message: "手机号必填",
        trigger: "blur",
      },
      {
        validator: validatePhone,
        trigger: "blur",
      },
      {
        validator: validateNumber,
        trigger: "blur",
      },
    ];
  },
  officePhone: () => {
    return [
      {
        validator: validateOfficePhone,
        trigger: "blur",
      },
    ];
  },
  required: (text) => {
    return [
      {
        required: true,
        message: text,
        trigger: "blur",
      },
    ];
  },
  length: (min, max) => {
    if (max) {
      return [
        {
          min,
          max,
          message: `位数限制，请输入${min}-${max}位`,
          trigger: "blur",
        },
      ];
    }
    return [
      {
        validator: validateLength(min),
        trigger: "blur",
      },
    ];
  },
  email: () => {
    return [
      {
        type: "email",
        message: `请填写正确邮箱格式`,
        trigger: "blur",
      },
    ];
  },
  date: () => {
    return [
      {
        validator: validateDate,
      },
    ];
  },
  day: () => {
    return [
      {
        validator: testTime,
        trigger: "blur",
      },
    ];
  },
  customer: () => {
    return [
      {
        validator: validateCustomerNo,
        trigger: "blur",
      },
    ];
  },
  code: () => {
    return [
      {
        validator: code,
        trigger: "blur",
      },
    ];
  },
  mobile: () => {
    return [
      {
        required: true,
        message: "请选择账号",
        trigger: "blur",
      },
    ];
  },
};

export const changePhoneEdit = {
  rules: {
    password: [
      ...ruleCollections.noZh(),
      ...ruleCollections.required("密码必填"),
      ...ruleCollections.length(6, 20),
    ],
    newPhone: ruleCollections.phone(),
    verifyCode: ruleCollections.required("验证码必填"),
  },
  init: () => {
    return {
      password: "",
      newPhone: "",
      verifyCode: "",
    };
  },
};

export const passwordEdit = {
  rules: {
    newPassword: [
      ...ruleCollections.noZh(),
      ...ruleCollections.required("密码必填"),
      ...ruleCollections.length(6, 20),
    ],
    phone: ruleCollections.phone(),
    verifyCode: ruleCollections.required("验证码必填"),
  },
  init: () => {
    return {
      newPassword: "",
      phone: "",
      verifyCode: "",
    };
  },
};
export const enterpriseEdit = {
  rules: {
    name: [
      ...ruleCollections.required("企业名称必填"),
      ...ruleCollections.length(2, 50),
    ],
    socialCode: ruleCollections.customer(),
    // contactor: [...ruleCollections.required('联系人必填'), ...ruleCollections.length(2, 20)],
    addr: [
      ...ruleCollections.required("请填写详细地址"),
      ...ruleCollections.length(5, 100),
    ],
    provinceCode: [...ruleCollections.required("请选择省份")],
    cityCode: [...ruleCollections.required("请选择城市")],
    mobile: ruleCollections.mobile(),
    powerCode: ruleCollections.code(),
    waterCode: ruleCollections.code(),
    gasCode: ruleCollections.code(),
    commuCode: ruleCollections.code(),
  },
  init: () => {
    return {
      addr: "",
      applyTime: "",
      cityCode: "",
      cityName: "",
      commuCode: "",
      contactor: "",
      corpSubTypeId: "",
      corpSubTypeName: "",
      corpTypeId: "",
      corpTypeName: "",
      createTime: "",
      gasCode: "",
      id: "",
      indusList: [],
      licence: "",
      mobile: "",
      modifiedTime: "",
      name: "",
      num: 0,
      openingInfo: "",
      openingType: 0,
      powerCode: "",
      provinceCode: "",
      provinceName: "",
      serviceList: [],
      serviceTime: "",
      socialCode: "",
      status: 0,
      waterCode: "",
    };
  },
};
export const operateDepartment = {
  rules: {
    name: ruleCollections.required("部门名称必填"),
    pname: ruleCollections.required("上级部门必选"),
  },
  init: () => {
    return {
      code: "",
      name: "",
      pname: "",
      managers: [],
      pid: "",
      status: 1,
    };
  },
};

export const operateEmployees = {
  rules: {
    staffName: ruleCollections.required("姓名必填"),
    jobNo: ruleCollections.length(2, 10),
    phone: ruleCollections.phone(),
    email: [...ruleCollections.length(50), ...ruleCollections.email()],
    birthDate: ruleCollections.date(),
    joinDate: ruleCollections.date(),
    wechatNo: ruleCollections.length(20),
    remark: ruleCollections.length(200),
    officePhone: [
      ...ruleCollections.length(20),
      ...ruleCollections.officePhone(),
    ],
  },
  init: () => {
    return {
      birthDate: "",
      departmentId: "",
      departmentName: "",
      email: "",
      enterpriseId: "",
      enterpriseName: "",
      enterpriseType: "",
      jobNo: "",
      joinDate: "",
      officePhone: "",
      password: "",
      phone: "",
      remark: "",
      duty: [],
      sex: 1,
      staffName: "",
      status: 1,
      wechatNo: "",
    };
  },
};

export const editEmployees = {
  rules: {
    staffName: ruleCollections.required("姓名必填"),
    jobNo: ruleCollections.length(2, 10),
    phone: ruleCollections.phone(),
    email: [...ruleCollections.length(50), ...ruleCollections.email()],
    birthDate: ruleCollections.date(),
    joinDate: ruleCollections.date(),
    wechatNo: ruleCollections.length(20),
    remark: ruleCollections.length(200),
    officePhone: [
      ...ruleCollections.length(200),
      ...ruleCollections.officePhone(),
    ],
  },
  init: () => {
    return {
      birthDate: "",
      departmentId: "",
      departmentName: "",
      email: "",
      enterpriseId: "",
      enterpriseName: "",
      enterpriseType: "",
      jobNo: "",
      joinDate: "",
      officePhone: "",
      phone: "",
      remark: "",
      duty: [],
      sex: 1,
      staffName: "",
      status: 1,
      wechatNo: "",
    };
  },
};

export const personalInfo = {
  rules: {
    // name: ruleCollections.required('姓名必填'),
    // jobNo: ruleCollections.length(2, 10),
    // mobile: ruleCollections.phone(),
    email: [...ruleCollections.length(50), ...ruleCollections.email()],
    birthDate: ruleCollections.date(),
    joinDate: ruleCollections.date(),
    jobTel: [...ruleCollections.length(20), ...ruleCollections.officePhone()],
    remark: ruleCollections.length(200),
    oldPassword: [
      ...ruleCollections.noZh(),
      ...ruleCollections.required("密码必填"),
      ...ruleCollections.length(6, 20),
    ],
    newPassword: [
      ...ruleCollections.noZh(),
      ...ruleCollections.required("密码必填"),
      ...ruleCollections.length(6, 20),
    ],
  },
  init: () => {
    return {
      birthDate: "",
      departmentId: "",
      departmentName: "",
      email: "",
      // "jobNo": "",
      joinDate: "",
      jobTel: "",
      // "mobile": "",
      remark: "",
      // "name": "",
      wechatNo: "",
    };
  },
};

export const announcementAdd = {
  rules: {
    title: [
      ...ruleCollections.required("标题必填"),
      ...ruleCollections.length(50),
    ],
    content: [
      ...ruleCollections.required("公告内容必填"),
      ...ruleCollections.length(1000),
    ],
  },
  init: () => {
    return {
      attach: "",
      content: "",
      isTemp: "",
      title: "",
    };
  },
};

export const announcementEdit = {
  rules: {
    title: [
      ...ruleCollections.required("标题必填"),
      ...ruleCollections.length(50),
    ],
    content: [
      ...ruleCollections.required("公告内容必填"),
      ...ruleCollections.length(1000),
    ],
  },
  init: () => {
    return {
      attach: "",
      content: "",
      isTemp: "",
      title: "",
    };
  },
};

export const oaAdd = {
  rules: {
    approvalRoleType: ruleCollections.required("审批人角色必选"),
    dealDay: ruleCollections.day(),
  },
  init: () => {
    return {
      approvalId: "string",
      approvalRequire: 1,
      approvalRoleType: "",
      approvalWay: 1,
      dealDay: 5,
      directorLevel: 1,
      indexs: 0,
      isSuperiorAllograph: 1,
      roleId: "",
      roleName: "",
      staffIds: [],
    };
  },
};

export const oaEdit = {
  rules: {
    approvalRoleType: ruleCollections.required("审批人角色必选"),
    dealDay: ruleCollections.day(),
  },
  init: () => {
    return {
      approvalId: "string",
      approvalRequire: 1,
      approvalRoleType: "",
      approvalWay: 1,
      dealDay: 5,
      directorLevel: 1,
      indexs: 0,
      isSuperiorAllograph: 1,
      roleId: "",
      roleName: "",
      staffIds: [],
    };
  },
};

export const unitAdd = {
  rules: {
    unitName: [
      ...ruleCollections.required("单位名称必填"),
      ...ruleCollections.length(1, 10),
    ],
  },
  init: () => {
    return {
      unitName: "",
    };
  },
};

export const roleAdd = {
  rules: {
    name: [
      ...ruleCollections.required("角色名称必填"),
      ...ruleCollections.length(1, 20),
    ],
    remark: ruleCollections.length(200),
  },
  init: () => {
    return {
      dataRange: "",
      name: "",
      realm: "",
      remark: "",
    };
  },
};

function validateDate(rule, value, callback) {
  const result = Number(value);
  if (isNaN(result)) {
    callback(new Error(`日期必选`));
  } else {
    callback();
  }
}

function validatePhone(rule, value, callback) {
  const length = value.length;
  if (length !== 11) {
    callback(new Error(`输入11位手机号`));
  } else {
    callback();
  }
}

function validateNumber(rule, value, callback) {
  const result = Number(value);
  if (isNaN(result)) {
    callback(new Error(`必须为纯数字`));
  } else {
    callback();
  }
}

function validateOfficePhone(rule, value, callback) {
  if (value) {
    const result = value.split("-");
    let call = false;
    if (result) {
      result.forEach((v) => {
        if (call) {
          return;
        }
        if (isNaN(Number(v))) {
          call = true;
        }
      });
      if (call) {
        callback(new Error(`只允许输入数字和 - 的组合`));
      } else {
        callback();
      }
    }
  } else {
    callback();
  }
}

function validateLength(min) {
  return (rule, value, callback) => {
    if (min && value) {
      if (value.toString().length > min) {
        callback(new Error(`限制长度小于${min}`));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
}

// 表单验证
// 密码验证6-8
// function validatePassword(rule, value, callback) {
//   let l = value.length,
//     max = 8,
//     min = 6
//   if (l < 6 || l > 8) {
//     callback(new Error(`输入${min}-${max}位密码`))
//   } else {
//     callback()
//   }
// }
// 各编号20位
function code(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  if (value.toString().length > 20) {
    callback(new Error("最多输入20位编号"));
    return;
  }
  callback();
}

function noZh(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  if (/[\u4e00-\u9fa5]/.test(value)) {
    callback(new Error("密码不能有中文"));
    return;
  }
  callback();
}

function validateCustomerNo(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  if (value.toString().length !== 18) {
    callback(new Error("输入18位编号"));
    return;
  }
  const regex = /^[a-zA-Z0-9]*$/;
  if (regex.test(value)) {
    callback();
  } else {
    callback(new Error("必须是英文或数字组合"));
  }
}

function testTime(rule, value, callback) {
  if (!value) {
    callback();
  }
  const time = Number(value);
  if (isNaN(time)) {
    callback(new Error("时间必须为数字"));
    return;
  }
  if (time <= 0) {
    callback(new Error("时间必须大于0"));
    return;
  }
  if (time > 9999) {
    callback(new Error("时间不能大于9999"));
    return;
  }
  const test = String(time).split(".");
  if (test && test[1]) {
    callback(new Error("时间必须为整数"));
    return;
  }
  callback();
}
