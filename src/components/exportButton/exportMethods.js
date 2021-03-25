/*
 * @Author: nutter
 * @Date: 2020-12-02 14:01:25
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:07:43
 * @FilePath: \nut-template\src\components\exportButton\exportMethods.js
 */
import axios from "@/axios";

export function postExport(params, url, respType) {
  if (respType === "blob") {
    return axios({
      method: "post",
      url: `${url}`,
      data: params,
      responseType: "blob",
    });
  } else {
    return axios({
      method: "post",
      url: `${url}`,
      data: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        },
      ],
    });
  }
}

export function getExport(params, url, respType) {
  return axios({
    url: `${url}`,
    params,
    responseType: respType === "blob" ? "blob" : "text",
  });
}

export function getOrpost(params, url, method, respType) {
  return method == "get"
    ? getExport(params, url, respType)
    : postExport(params, url, respType);
}
export function computeRes(res) {
  let type = typeof res;
  if (type === "object") {
    for (let i in res) {
      let itype = typeof res[i];
      if (itype === "object") {
        for (let j in res[i]) {
          if (j === "url") {
            return res[i][j];
          }
        }
      } else {
        if (i === "url") {
          return res[i];
        }
      }
    }
  } else {
    return res;
  }
}

export function downloadFile(res, fileName, respType) {
  if (!res) {
    return;
  }
  let url =
    respType === "blob"
      ? window.URL.createObjectURL(new Blob([res]))
      : computeRes(res);
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName || "下载.xlsx");
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
  }, 20000);
}
