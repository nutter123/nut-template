<!--
 * @Author: nutter
 * @Date: 2021-03-25 10:41:46
 * @LastEditors: nutter
 * @LastEditTime: 2021-03-25 10:47:02
 * @FilePath: \nut-template\src\App.vue
-->

<template>
  <div id="app" class="app-container df">
    <div class="main layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data: function () {
    return {
      routes: {},
    };
  },
  created() {},
  computed: {},
  mounted() {},
};
</script>
<style>
body {
  overflow: auto;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 600px;
  overflow: hidden;
}
.main {
  overflow: auto;
  height: 100%;
}
</style>