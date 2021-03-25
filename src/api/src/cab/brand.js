/*
 * @Author: nutter
 * @Date: 2020-08-19 14:03:01
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:43:27
 * @FilePath: \nut-template\src\api\src\cab\brand.js
 */
import axios from "@/axios";
const _module = `channel-ims/express/company`;
export default {
  /**
   * 查询快件品牌列表
   *
   * @param {any} data
   * @post
   */
  list(data) {
    return axios({
      url: `${_module}/list`,
      method: "GET",
      params: data,
    });
  },
  add(data) {
    return axios({
      url: `${_module}/`,
      method: "POST",
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
      data,
    });
  },
  edit(id, data) {
    return axios({
      url: `${_module}/${id}`,
      method: "PUT",
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
      data,
    });
  },
  delete(id, data) {
    return axios({
      url: `${_module}/${id}`,
      method: "DELETE",
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
      data,
    });
  },
};
