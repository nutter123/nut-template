// <el-input placeholder="输入关键字" v-model="filterTreeKeyword" clearable
// @clear="handleTreeSearch"></el-input>
//<div class="tree-light br" style="width:218px;min-width:218px">         
//<el-tree :data="deviceTree"
// ref="refTree" :props="treeProps" node-key="id" highlight-current
// @node-click="handleDeviceClick"
// :filter-node-method="filterTreeNode"></el-tree>
export default {
  data() {
    return {
      filterTreeKeyword: '',
      autoFilterTree: false,
      expandKeys:[]
    }
  },
  watch: {
    filterTreeKeyword() {
      if (this.autoFilterTree) {
        this.handleTreeSearch()
      }
    }
  },
  methods: {
    handleTreeSearch() {
      this
        .$refs
        .refTree
        .filter(this.filterTreeKeyword)
    },
    filterTreeNode(value, data) {
      if (!value)
        return true;
      return data
        .name
        .indexOf(value) !== -1;
    },
    nodeExpand(data) {
      if (this.expandKeys.indexOf(data.id) == -1) {
        this.expandKeys.push(data.id)
      }
    },
    nodeCollapse(data) {
      let index = this.expandKeys.indexOf(data.id)
      if (index >= 0) {
        this.expandKeys.splice(index, 1)
      }
    },
  }
}