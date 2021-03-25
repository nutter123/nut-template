/*
 * @Author: nutter
 * @Date: 2020-12-24 10:29:06
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:00:31
 * @FilePath: \nut-template\src\mock\index.js
 */
import Mock from "mockjs";

Mock.setup({
  timeout: "500-800",
});

const context = require.context("./services", true, /\.mock\.js$/);
context.keys().forEach((key) => {
  Object.keys(context(key)).forEach((paramKey) => {
    Mock.mock(...context(key)[paramKey]);
  });
});
