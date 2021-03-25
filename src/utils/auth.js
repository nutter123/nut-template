import { options } from "vueAsset";
export const getSessionId = () => {
  return options.plugins.axios.interceptor.authMac.getSessionId();
};
