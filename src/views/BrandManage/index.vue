<template>
  <div>
    <n-title>
      <span>快递品牌管理</span>
    </n-title>
    <div class="pd-20">
      <search-form @search="onSearch" ref="searchForm"></search-form>
      <el-card shadow="never">
        <div class="text-right">
          <n-button
            value
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="toAddNew()"
            >新增</n-button
          >
        </div>
        <el-table
          :data="tableParams.list"
          tooltip-effect="light"
          ref="table"
          class="mt-20"
          type="selection"
          header-cell-class-name="n-table-header"
        >
          <el-table-column
            label="序号"
            prop="sort"
            min-width="20"
          ></el-table-column>
          <el-table-column label="LOGO" prop="logoUrl" min-width="80">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.logoUrl"
                fit="fit"
                style="width: 30px; height: 30px"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="快递品牌名称"
            prop="companyName"
            min-width="80"
          ></el-table-column>
          <el-table-column label="状态" prop="status" min-width="80">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status <= 0 ? 'danger' : 'success'"
                disable-transitions
                >{{ scope.row.status | checkStatus }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            min-width="80"
          ></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <!-- 列表操作菜单 -->
              <el-button type="text" size="medium" @click="toEdit(scope.row)"
                >修改</el-button
              >
              <el-button type="text" size="medium" @click="toDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="tableParams.pageSize"
          :page-sizes="tableParams.pageSizes"
          :total="tableParams.total"
          :layout="tableParams.layout"
          class="mt-15 text-right"
        ></el-pagination>
      </el-card>
      <add-dialog
        v-model="addShow"
        title="新增品牌"
        @change="closeAddPanel"
        class="panel-zindex"
        ref="newWebsite"
        @after-save="afterAddSave"
      ></add-dialog>
      <add-dialog
        v-model="editShow"
        title="修改品牌"
        @change="closeEditPanel"
        class="panel-zindex"
        ref="editWebsite"
        :editStatus="true"
        :info="editInfo"
        @after-save="afterEditSave"
      ></add-dialog>
    </div>
  </div>
</template>
<script>
import searchForm from "./components/SearchForm";
import tableMixin from "@/mixins/tableMixin";
import addDialog from "./components/AddDialog";
// import { fmt } from "@/utils/index";
export default {
  data() {
    return {
      addShow: false, // 新增显示
      editShow: false, //修改显示
      editInfo: {}, //修改信息
      query: {},
    };
  },
  components: {
    searchForm,
    addDialog,
  },
  mixins: [tableMixin],
  filters: {
    checkStatus(status) {
      if (status <= 0) {
        return "禁用";
      } else {
        return "启用";
      }
    },
  },
  methods: {
    onSearch(query) {
      // 重置
      // this.tableParams.selectList = [];
      this.reset = true;
      this.allData = [];
      this.tableParams.pageNum = 1;
      this.query = query;
      this.loadList();
    },
    async loadList() {
      let params = {
        pageNum: this.tableParams.pageNum,
        pageSize: this.tableParams.pageSize,
        ...this.query,
      };
      if (this.allData[this.tableParams.pageNum - 1] && !this.reset) {
        this.initialTableData(
          this.allData[this.tableParams.pageNum - 1],
          this.tableParams.total
        );
      } else {
        let _result = await this.$apis.cab.brand.list(
          this.assignQuery({
            ...params,
          })
        );
        if (_result.comItems && _result.comItems.length > 0) {
          this.$nextTick(function () {
            this.allData[this.tableParams.pageNum - 1] = _result.comItems;
            this.initialTableData(_result.comItems, _result.total);
            this.reset = false;
          });
        } else {
          this.$nextTick(function () {
            this.allData = [];
            this.initialTableData([], 0);
            this.reset = false;
          });
        }
        this.$refs.table.clearSelection();
      }
    },
    toEdit(row) {
      this.editInfo = row;
      this.editShow = true;
    },
    toDel(row) {
      let that = this;
      this.$confirm("确定删除该品牌吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$apis.cab.brand.delete(row.expressCompanyId).then((res) => {
            if (res.msg && res.code != 200) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              that.$notify({
                title: "成功",
                message: "操作成功!",
                type: "success",
              });
              this.$refs.searchForm.onSearch();
            }
          });
        })
        .catch(() => {});
    },
    toAddNew() {
      // 新增s
      this.addShow = true;
    },
    closeAddPanel() {
      // 关闭新增弹窗
      this.addShow = false;
      this.$refs.searchForm.onSearch();
    },
    closeEditPanel() {
      this.editShow = false;
      this.editInfo = {};
      this.$refs.searchForm.onSearch();
    },
    afterAddSave() {
      this.closeAddPanel();
    },
    afterEditSave() {
      // 新增回调
      this.closeEditPanel();
    },
  },
};
</script>
