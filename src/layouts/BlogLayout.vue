<script lang="ts" setup>
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <el-container>
    <!-- 顶部栏 -->
    <el-header class="fixed-header"> <AppHeader /> </el-header>

    <!-- 主体 -->
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
