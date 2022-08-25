<template>
  <div class="article-container">
    <!-- =============== 搜索工具栏 =============== -->
    <div class="search-bar">
      <el-form
        ref="searchForm"
        label-width="100px"
        class="search-form"
        inline
      >
        <el-form-item>
          <el-input
            type="text"
            autocomplete="off"
            placeholder="请输入文章标题关键字"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            placeholder="请选择文章分类"
          >
            <el-option label="全部分类" value=""></el-option>
            <el-option>
            </el-option>
            <template #prefix>
              <el-icon><files></files></el-icon>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            plain
            type="primary"
          >
            <el-icon><search></search></el-icon>
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <div class="tool-buttons">
        <el-button
          plain
          type="success"
        >
          <el-icon><plus></plus></el-icon>
          创建文章
        </el-button>
      </div>
    </div>

    <!-- =============== 文章列表 =============== -->
    <el-table class="article-table">
      <el-table-column label="文章标题"></el-table-column>
      <el-table-column
        label="所属分类"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button
            type="text"
          >
            <el-icon><edit></edit></el-icon>
            编辑
          </el-button>

          <el-button
            type="text"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts" setup>
import { Search, Edit, Files, Plus, Delete } from '@element-plus/icons-vue'


</script>

<style lang="scss" scoped>
.article-container {
  padding-right: 30px;

  .search-bar {
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .article-table {
    margin-bottom: 30px;
  }
}
</style>