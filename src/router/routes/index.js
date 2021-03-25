import { requireContentArray } from "@/utils";

const content = requireContentArray(
  require.context("./", true, /^\.\/[\s\S]+\/*\.js$/),
  ["./index.js"]
);

export default content;
