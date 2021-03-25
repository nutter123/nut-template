import config from "@/config";

export const showConfirm = function (_this, msg, callback) {
  _this
    .$confirm(msg, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(() => {
      if (callback) {
        callback.call(_this);
      }
    })
    .catch(() => {
      _this.$message({
        type: "info",
        message: `已取消`,
      });
    });
};

export const errorHandler = (error) => {
  if (error.response == null) {
    return error.message;
  } else if (
    error.response.data == null ||
    typeof error.response.data !== "object"
  ) {
    return error.message;
  } else if (error.response.data && error.response.data.errMsg) {
    return error.response.data.errMsg;
  }
  return "发生未知错误，请重试";
};

export const utilCookie = {
  set: function (name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie =
      name + "=" + value + ";path=/;expires=" + d.toGMTString();
  },
  get: function (name) {
    var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  },
  delete: function (name) {
    this.set(name, "", -1);
  },
};

// 一维数组转树形结构
export const array2tree = (array, pflag = "pid", sflag = "id", root = 0) => {
  function cascader(pid, level = 1) {
    const target = [];
    array.forEach((a) => {
      const _clone = Object.assign({}, a);
      if (_clone[pflag] == pid) {
        _clone.level = level;
        target.push(_clone);
        const _child = cascader(_clone[sflag], level + 1);
        if (_child.length) {
          _clone.children = _child;
        }
      }
    });
    return target;
  }
  return cascader(root);
};

export const treeArrayAddLevel = (array, level = 0, list = "list") => {
  function setLevel(inArray1, inLevel) {
    let _temp = inLevel + 1;
    inArray1.forEach((item) => {
      item.level = _temp;
      if (item[list] && item[list].length) {
        setLevel(item[list], _temp);
      } else {
        return;
      }
    });
    return inArray1;
  }
  return setLevel(array, level);
};
export const isSelfOrChild = (targetArray, currentId) => {
  let result;
  function makeTree(arry) {
    arry.forEach((item) => {
      if (item.pid == currentId) {
        result = true;
        return;
      } else {
        result = false;
      }
      if (item.list && item.list.length) {
        makeTree(item.list);
      }
    });
    return result;
  }
  if (targetArray[0].id == currentId) {
    console.log("自身");
    return true;
  } else {
    return makeTree(targetArray);
  }
};

export const getParentName = (list, pid) => {
  let pName;
  function findName(arr, iPid) {
    if (pid && pid != 0) {
      arr.forEach((item) => {
        if (item.id == iPid) {
          console.log(item.name);
          pName = item.name;
          return;
        }
        if (item.list && item.list.length) {
          findName(item.list, iPid);
        }
      });
    } else {
      pName = "该菜单为一级菜单";
    }
    return pName;
  }
  return findName(list, pid);
};
export const getParentsIds = (list, leafId, key = "id", f_key = "fid") => {
  const ids = [],
    maps = {};
  list.forEach((n) => {
    maps[n[key]] = n;
  });
  while (maps[leafId]) {
    ids.push(leafId.toString());
    leafId = maps[leafId][f_key];
  }
  return ids;
};
export const getArrayIds = (list, key) => {
  let arry = [];
  list.forEach((n) => {
    arry.push(n[key]);
  });
  return arry.join(",");
};

export const copySameNamePropety = (to, from) => {
  for (let key in to) {
    to[key] = from[key];
  }
  return to;
};

export const getCurDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  var minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  var seconds =
    date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    hours +
    seperator2 +
    minutes +
    seperator2 +
    seconds;
  return currentdate;
};

export const getDateFormat = (e) => {
  let date = e;
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  var minutes =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  var seconds =
    date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    hours +
    seperator2 +
    minutes +
    seperator2 +
    seconds;
  return currentdate;
};

export const print = (obj) => {
  var newWindow = window.open("打印窗口", "_blank");
  newWindow.document.write(window.document.head.innerHTML);
  newWindow.document.write(obj.innerHTML);
  //关闭文档
  newWindow.document.close();
  //调用打印机
  setTimeout(function () {
    newWindow.print();
    newWindow.close();
  }, 500);
};

// webpack require.context 转为数组包装函数 export 使用 default
export const webpackRequire2array = (r, exinclude) => {
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

// 转成数字
export const getNumber = (val) => {
  return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
};
// 转成整数
export const getInteger = (val) => {
  return isNaN(parseFloat(val)) ? 0 : parseInt(val);
};
//参数格式化
export function parseParam(params) {
  let str = "";
  for (var o in params) {
    // if (params[o] != -1) {
    str += o + "=" + params[o] + "&";
    // }
  }
  let _str = str.substring(0, str.length - 1);
  return _str;
}
//导出数据
export function exportExcel(params, url) {
  let iframe = document.createElement("<iframe>");
  let tempUrl;
  if (process.env.NODE_ENV == "development") {
    tempUrl = config.host + url + "?" + parseParam(params);
  } else {
    tempUrl = window.location.origin + url + "?" + parseParam(params);
  }
  iframe.on("load", () => {
    iframe[0].contentWindow.location.href = tempUrl;
  });
  document.body.appendChild(iframe);
}
// 字符串截取
export const subStringLimit = (str, num) => {
  if (str.length <= num) return str;

  return str.substring(0, num) + "...";
};

// 数据转换
export const dataComputed = (data) => {
  return Array.from(data).map((item) => {
    return item.id;
  });
};

// 数据转换
export const postDataComputed = (newArr, allArr) => {
  return Array.from(newArr).map((item) => {
    for (let i = 0; i < allArr.length; i++) {
      if (allArr[i].id === item) {
        return allArr[i];
      }
    }
  });
};

// 简单JSON转标准JSON
export const JSONComputed = (_data) => {
  let data = [];
  //确认父节点
  for (let i = 0, leng = _data.length; i < leng; i++) {
    let k = 0; //找不到父节点，此节点为根节点
    let _parent = {};
    for (let j = 0, leng = _data.length; j < leng; j++) {
      if (_data[i].parentId === _data[j].id) {
        k++;
        break;
      }
    }
    if (k === 0) {
      //找不到父节点，此节点为根节点
      _parent = {
        id: _data[i].id,
        name: _data[i].name,
        isMenu: _data[i].isMenu,
        parentId: _data[i].parentId,
        permissionId: _data[i].permissionId,
      };
      data.push(_parent);
    }
  }
  for (let i = 0, leng = data.length; i < leng; i++) {
    lookUp(data[i]);
  }
  //添加一级子节点
  function lookUp(_sumConfig) {
    var childnum = 0; //子节点数目
    for (var j = 0, l = _data.length; j < l; j++) {
      //添加子节点
      var _child = {};
      if (_data[j].parentId === _sumConfig.id) {
        if (++childnum === 1) {
          _sumConfig.child = [];
        }
        _child = {
          id: _data[j].id,
          name: _data[j].name,
          isMenu: _data[j].isMenu,
          parentId: _data[j].parentId,
          permissionId: _data[j].permissionId,
        };
        _sumConfig.child.push(_child);
        lookUp(_child);
      }
    }
  }
  return data;
};
