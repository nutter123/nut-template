/*
 * @Author: nutter
 * @Date: 2020-08-03 11:32:16
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:37:16
 * @FilePath: \nut-template\src\router\routes\brandManage.js
 */
import { lazyComponent } from "@/utils";
export default [
  {
    path: "/brandManage",
    name: "brandManage",
    icon: "menu-system",
    title: "快递品牌管理",
    component: lazyComponent("BrandManage", true),
  },
];
