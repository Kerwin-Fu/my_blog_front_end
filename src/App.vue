<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
// 全局样式
html,
body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, SF UI Display, Arial, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
}

a {
  text-decoration: none;
}

.el-header {
  border-bottom: 1px solid #f0f0f0;
}

.fixed-header {
  position: sticky;
  top: 0;
  left: 0;
}
</style>
