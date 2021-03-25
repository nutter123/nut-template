/*
 * @Author: nutter
 * @Date: 2020-12-24 10:36:05
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 16:09:07
 * @FilePath: \nut-template\src\mock\services\index\example.mock.js
 */
import Mock from "mockjs";

const { Random } = Mock;
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ["132", "135", "189"]; // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/); //Number()
  },
});

export default [
  RegExp("/example.*"),
  "get",
  {
    "total|50-100": 50,
    "data|10": [
      {
        // 唯一 ID
        id: "@guid()",
        // 生成一个中文名字
        name: "@cname()",
        "password|000000-999999": 433432,
        phone: "@phone",
        idCard: "326748367438644",
        "type|0-1": 1,
        // 生成一个 url
        url: "@url()",
        // 生成一个地址
        area: Mock.mock("@county(true)"),
        address: "@cparagraph(1)",
        // 从数组中随机选择一个值
        "array|1": ["A", "B", "C", "D", "E"],
        // 随机生成一个时间
        time: "@datetime()",
        // 生成一张图片
        image: Random.dataImage("200x100", "Mock Image"),
      },
    ],
  },
];
