/*
 * @Author: nutter
 * @Date: 2020-08-19 14:03:01
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 10:49:22
 * @FilePath: \nut-template\src\api\index.js
 */
// api 文件以统一格式 export function xxx 输出
import { requireContentFolderObj } from "@/utils";
const api = requireContentFolderObj(
  require.context("./src", true, /^\.\/[\s\S]+\/*\.js$/),
  ["./index.js"]
);
console.log(api);
export default api;
