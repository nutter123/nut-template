<template>
  <div style="display: inline-block" v-if="showStatus">
    <el-button type="primary" v-if="type == 'button'" size="small"
      >导出</el-button
    >
    <i class="el-icon-download pointer" v-if="type == 'icon'"></i>
  </div>
</template>

<script>
import { downloadFile, getOrpost } from "./exportMethods";
// import VueCookie from "vue-cookie";
import moment from "moment";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    exportQuery: {
      type: Object,
      default() {
        return {
          query: {},
          url: "",
          fileName: "",
          total: null,
        };
      },
      required: true,
    },
    type: {
      type: String,
      default: "button",
    },
    method: {
      type: String,
      default: "get",
    },
    respType: {
      type: String,
      default: "blob",
    },
  },
  watch: {
    exportQuery() {
      this.exportOrder();
    },
  },
  data() {
    return {
      showStatus: true,
    };
  },
  created() {
    this.auth();
  },
  methods: {
    auth() {
      this.showStatus = true;
      // let authArr = JSON.parse(VueCookie.get("AUTH_CODE"));
      // if (authArr) {
      //   let value = this.value;
      //   if (authArr.includes(value)) {
      //     this.showStatus = true;
      //   } else {
      //     this.showStatus = false;
      //   }
      // } else {
      //   this.showStatus = false;
      // }
    },
    exportOrder() {
      let _vm = this;
      let params = Object.assign({}, _vm.exportQuery.query);
      let nowTime = moment().format("YYYYMMDDHHmmss");
      params.page_num = 1;
      if (_vm.exportQuery.total > 500) {
        _vm
          .$confirm("当前数目大于500条，将仅导出前500条", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            params.page_size = 500;
            getOrpost(
              params,
              _vm.exportQuery.url,
              _vm.method,
              _vm.respType
            ).then((res) => {
              downloadFile(
                res,
                nowTime + _vm.exportQuery.fileName,
                _vm.respType
              );
            });
          })
          .catch(() => {
            _vm.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        params.page_size = _vm.exportQuery.total;
        getOrpost(params, _vm.exportQuery.url, _vm.method, _vm.respType).then(
          (res) => {
            downloadFile(res, nowTime + _vm.exportQuery.fileName, _vm.respType);
          }
        );
      }
    },
  },
};
</script>
