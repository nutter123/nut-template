/*
 * @Author: nutter
 * @Date: 2020-08-17 15:09:42
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 10:48:37
 * @FilePath: \nut-template\src\axios\index.js
 */
import { axios } from "nutter-ui";
import VueCookie from "vue-cookie";
import config from "@/config";
import { Message } from "element-ui";

const defaults = {
  baseURL: config.host,
  timeout: 30000,
  headers: {
    session_id: VueCookie.get("session_id"),
  },
};
const interceptor = {
  authMac: false,
  dataToUnderline: false,
  errorHandle: {
    errorHandle(error) {
      const { status } = error.response;
      let msg;
      switch (status) {
        /* eslint-disable no-param-reassign */
        case 400:
          msg = "请求错误";
          break;
        case 401:
          msg = "未授权，请登录";
          break;
        case 403:
          msg = "拒绝访问";
          break;
        case 404:
          // msg = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          msg = "请求超时";
          break;
        case 500:
          msg = "服务器内部错误";
          break;
        case 501:
          msg = "服务未实现";
          break;
        case 502:
          msg = "网关错误";
          break;
        case 503:
          msg = "服务不可用";
          break;
        case 504:
          msg = "网关超时";
          break;
        case 505:
          msg = "HTTP版本不受支持";
          break;
        default:
          msg = error.response.data.msg.split("，")[0];
          break;
        /* eslint-disabled */
      }
      if (msg) {
        Message({
          message: msg,
          type: "error",
          duration: 2000,
          showClose: true,
        });
      }
    },
  },
};
const $axios = axios.install({
  defaults,
  interceptor,
});
export default $axios;
