/*
 * @Descripttion:
 * @version:
 * @Author: nut
 * @Date: 2019-09-03 11:08:27
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 10:50:28
 */
const env = process.env.NODE_ENV;
const devHost = "https://test-api.tengzone.com/";
const devHostNew = "https://test-api.tengzone.com/";
const testHost = "https://test-api.tengzone.com/";
const testHostNew = "https://test-api.tengzone.com/";
const prodHost = "https://test-api.tengzone.com/";
const prodHostNew = "https://test-api.tengzone.com/";
export const uacct = "https://uacct.tengzone.com/";

// 开发环境： npm run dev
const development = {
  host: devHost,
  qiniuUrl: devHostNew,
  newHost: devHostNew,
};

// 打包开发环境： npm run build dev
const dev = {
  host: devHost,
  qiniuUrl: devHost,
  newHost: devHostNew,
};

// 打包测试环境： npm run build test
const test = {
  host: testHost,
  qiniuUrl: testHost,
  newHost: testHostNew,
};

// 打包正式环境： npm run build
const production = {
  host: prodHost,
  qiniuUrl: prodHostNew,
  newHost: prodHostNew,
};

const CONFIG = {
  development,
  dev,
  test,
  production,
};
export default CONFIG[env];
