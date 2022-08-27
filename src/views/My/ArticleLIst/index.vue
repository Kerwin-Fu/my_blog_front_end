<template>
  <div class="article-container">
    <!-- =============== 搜索工具栏 =============== -->
    <div class="search-bar">
      <el-form ref="searchForm" label-width="100px" class="search-form" inline>
        <el-form-item>
          <el-input
            type="text"
            autocomplete="off"
            placeholder="请输入文章标题关键字"
            v-model="listParams.keyword"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            placeholder="请选择文章分类"
            v-model="listParams.categoryId"
          >
            <el-option
              v-for="item in categories"
              :label="item.name"
              :value="item._id"
            ></el-option>
            <template #prefix>
              <el-icon><files></files></el-icon>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button plain type="primary" @click="searchHandler">
            <el-icon><search></search></el-icon>
            搜索
          </el-button>
        </el-form-item>
      </el-form>

      <div class="tool-buttons">
        <el-button plain type="success">
          <el-icon><plus></plus></el-icon>
          创建文章
        </el-button>
      </div>
    </div>

    <!-- =============== 文章列表 =============== -->
    <el-table class="article-table" :data="listData.items">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column
        label="所属分类"
        width="200"
        align="center"
        prop="category.name"
      >
      </el-table-column>
      <el-table-column label="创建时间" width="200" align="center">
        <template #dafault="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="text">
            <el-icon><edit></edit></el-icon>
            编辑
          </el-button>

          <el-button type="text"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- =============== 分页栏 =============== -->
    <el-pagination
      layout="total, sizes, prev, pager, next"
      :total="listData.total"
      :page-sizes="[5, 10, 15, 20]"
      v-model:pageSize="listParams.pageSize"
      v-model:currentPage="listParams.pageNo"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { formatDate } from '@/utils/format'
import { Search, Edit, Files, Plus, Delete } from '@element-plus/icons-vue'
import { listArticles } from '@/apis/articles'
import { listCategories } from '@/apis/category'

const listData = reactive({
  total: 0,
  items: [] as any[]
})
const categories = ref<any[]>([])

const listParams = reactive({
  categoryId: '',
  keyword: '',
  pageNo: 1,
  pageSize: 5
})

const searchHandler = () => {
  ;(listParams.pageNo = 1), getCategoryList()
}

const getCategoryList = async () => {
  try {
    const { data: res } = await listArticles(listParams)
    listData.total = res.data.total
    listData.items = res.data.items
  } catch (e) {
    console.log(e)
  }
}

const getCategories = async () => {
  try {
    const { data: res } = await listCategories()
    categories.value = res.data
  } catch (e) {
    console.log(e)
  }
}
getCategories()
watch(
  [() => listParams.pageNo, () => listParams.pageSize],
  () => getCategoryList(),
  { immediate: true }
)
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
