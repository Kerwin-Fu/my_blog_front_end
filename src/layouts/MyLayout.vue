<script lang="ts" setup>
import AppHeader from '../components/AppHeader.vue'
import MySideMenu from "../components/MySideMenu.vue";
</script>

<template>
  <el-container>
    <!-- 顶部栏 -->
    <el-header class="fixed-header"> <app-header /> </el-header>

    <el-container>
      <!-- 左边侧栏 -->
      <el-aside width="340px"> <my-side-menu /> </el-aside>

      <!-- 右边主体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
