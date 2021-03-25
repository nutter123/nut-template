<!--
 * @Author: nutter
 * @Date: 2020-08-03 13:46:31
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:41:47
 * @FilePath: \nut-template\src\views\BrandManage\components\SearchForm.vue
-->
<template>
  <el-card class="mb-20" shadow="never">
    <!-- 查询表单 -->
    <el-form
      :inline="true"
      size="small"
      ref="searchForm"
      label-width="130px"
      :model="query"
    >
      <el-form-item prop="companyName" label="快递品牌名称：">
        <el-input
          placeholder="请输入快递品牌名称"
          v-model="query.companyName"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态：">
        <el-select
          class="w180"
          v-model="query.status"
          clearable
          placeholder="请选择状态"
        >
          <el-option label="全部" value></el-option>
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <div class="fr">
        <el-form-item class="ml-20">
          <el-button
            size="small"
            icon="el-icon-refresh-right"
            @click="onReset()"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="onSearch()"
            >搜索</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script>
// import { fmt } from "@/utils";
export default {
  data() {
    return {
      query: {
        companyName: "",
        status: "",
      },
    };
  },
  components: {},
  created() {
    this.onSearch();
  },
  methods: {
    onSearch() {
      this.$emit("search", this.query);
    },
    onReset() {
      this.query = {
        companyName: "",
        status: "",
      };
      this.$emit("search", this.query);
    },
  },
};
</script>

<style lang="scss"></style>
