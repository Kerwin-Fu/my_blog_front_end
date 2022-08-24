<template>
  <el-container>
    <!-- 顶部栏 -->
    <el-header class="fixed-header"> 页头 </el-header>

    <el-container>
      <!-- 左边侧栏 -->
      <el-aside width="340px"> 边栏 </el-aside>

      <!-- 右边主体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
