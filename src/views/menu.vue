<!--
 * @Author: nutter
 * @Date: 2021-03-25 11:09:05
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 11:09:15
 * @FilePath: \nut-template\src\views\menu.vue
-->
<template>
  <div class="test-menu">
    <div v-for="(item, i) in menus" :key="i" v-show="item.title">
      <el-button @click="handlerClickButton(item.name)">{{
        item.title
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { routes } from "@/router";
export default {
  data() {
    return {
      menus: routes,
    };
  },
  created() {},
  methods: {
    handlerClickButton(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>

<style lang="scss">
.test-menu {
  width: 50%;
  max-width: 600px;
  margin: auto;
  button.el-button {
    width: 100%;
  }
}
</style>
