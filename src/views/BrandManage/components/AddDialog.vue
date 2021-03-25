<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      @close="handleClose"
      width="520px"
      custom-class="n-dialog"
    >
      <div class="pb80 pt20">
        <el-form
          ref="infoForm"
          :model="addForm"
          :rules="rules"
          label-width="100px"
          class="info-form"
        >
          <el-form-item label="状态：" prop="status">
            <el-switch
              v-model="addForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
          <el-form-item label="序号：" prop="sort">
            <el-input
              size="small"
              v-model="addForm.sort"
              placeholder="请输入序号"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="companyName">
            <el-input
              size="small"
              v-model="addForm.companyName"
              placeholder="请输入快递品牌名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="logo：" prop="logoUrl">
            <n-upload-image
              v-model="addForm.logoUrl"
              :singleFileSize="10"
              :limit="1"
              httpRequest="qiniu"
            >
              <img
                v-if="addForm.logoUrl"
                :src="addForm.logoUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </n-upload-image>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              size="small"
              type="textarea"
              style="min-width: 300px"
              :autosize="{ minRows: 2, maxRows: 4 }"
              v-model="addForm.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm">重置</el-button>
        <el-button size="small" type="primary" @click="submitForm"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "add-dialog",
  model: {
    prop: "dialogVisible",
    event: "change",
  },
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    dialogVisible: {
      type: Boolean,
    },
    info: {
      type: Object,
      default() {
        return {};
      },
      required: false,
    },
    editStatus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    show: {
      get: function () {
        if (this.editStatus == true) {
          this.checkShow();
        }
        return this.dialogVisible;
      },
      set: function () {},
    },
  },
  data() {
    return {
      infoStatus: false,
      addForm: {
        companyName: "",
        logoUrl: "",
        remark: "",
        sort: "",
        status: "1",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入商户姓名",
            trigger: "blur",
          },
        ],
        logo: [
          {
            required: true,
            message: "请选择logo",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
        sort: [
          {
            required: true,
            message: "请填写序号",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      resetId: null,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    checkShow() {
      this.addForm = {
        companyName: this.info.companyName,
        logoUrl: this.info.logoUrl,
        remark: this.info.remark,
        sort: this.info.sort,
        status: this.info.status,
      };
    },
    handleClose() {
      this.$emit("change");
    },
    resetForm() {
      // 重置表单
      this.$refs.infoForm.resetFields();
    },
    submitForm() {
      // 提交表单
      let that = this;
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          let params = that.addForm;
          if (this.editStatus == true) {
            this.$apis.cab.brand
              .edit(that.info.expressCompanyId, params)
              .then((res) => {
                if (res.msg && res.code != 200) {
                  this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                  });
                  this.$emit("after-save");
                }
              });
          } else {
            this.$apis.cab.brand.add(params).then((res) => {
              if (res.msg && res.code != 200) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                });
                this.$emit("after-save");
              }
            });
          }
        } else {
          this.$message.error("请将数据填写完整");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.info-form {
  width: 460px;
}
.dialog-footer {
  border-top: 1px solid #eee;
  padding-top: 20px;
}
</style>
