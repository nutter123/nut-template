/*
 * @Author: nutter
 * @Date: 2020-08-19 14:03:01
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 10:49:50
 * @FilePath: \nut-template\src\api\src\cab\area.js
 */
import axios from "@/axios";
import { bascBase } from "@/api/config";
const _module = `${bascBase}/area`;

export default {
  /**
   * 省列表
   * * @param {any} data
   * @returns
   */
  getProvinceList() {
    return axios({
      url: `${_module}/province/list`,
    });
  },
  /**
   * 城市列表
   * * @param {any} data
   * @returns
   */
  getCityList(params) {
    return axios({
      url: `${_module}/city/${params.provinceId}/list`,
    });
  },
  /**
   * 区列表
   * * @param {any} data
   * @returns
   */
  getAreaList(params) {
    return axios({
      url: `${_module}/area/${params.cityId}/list`,
    });
  },
};
