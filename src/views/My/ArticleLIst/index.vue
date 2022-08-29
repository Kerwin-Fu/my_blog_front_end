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
        <el-button plain type="success" @click="createHandler">
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
          <el-button type="text" @click="editHandler(scope.row)">
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

    <create-or-update-form
      v-model:visible="dialogVisible"
      :article="dialogFormData"
      :categories="categories"
      @complete="completeHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { formatDate } from '@/utils/format'
import { Search, Edit, Files, Plus, Delete } from '@element-plus/icons-vue'
import { getArticle, listArticles } from '@/apis/articles'
import { listCategories } from '@/apis/category'
import CreateOrUpdateForm from './components/CreateOrUpdateForm.vue'

const listData = reactive({
  total: 0,
  items: [] as any[]
})
// 文章分类数组
const categories = ref<any[]>([])
// 搜索参数
const listParams = reactive({
  categoryId: '',
  keyword: '',
  pageNo: 1,
  pageSize: 5
})

// 添加编辑/新文章弹出框
const dialogVisible = ref<boolean>(false)
  // 文章回显详情
const dialogFormData = reactive({
  _id: '',
  title: '',
  summary: '',
  content: '',
  categoryId: ''
})

// 搜索按钮
const searchHandler = () => {
  ;(listParams.pageNo = 1), getCategoryList()
}

// 创建文章按钮
const createHandler = () => {
  ;(dialogFormData._id = ''),
    (dialogFormData.categoryId = ''),
    (dialogFormData.content = ''),
    (dialogFormData.summary = ''),
    (dialogFormData.title = '')
  dialogVisible.value = true
}

// 编辑文章按钮
const editHandler = async (row: any) => {
  const { data: res } = await getArticle(row._id)

  dialogFormData._id = row._id
  dialogFormData.title = res.data.title
  dialogFormData.summary = res.data.summary
  dialogFormData.content = res.data.content
  dialogFormData.categoryId = res.data.categoryId

  dialogVisible.value = true
}

// 弹出框完成
const completeHandler = (isEdit: boolean) => {
  if (!isEdit) {
    listParams.pageNo = 1
  }
  getCategoryList()
}

//  🌟🌟🌟🌟🌟🌟 接口👇 🌟🌟🌟🌟🌟🌟🌟
// 获取文章列表
const getCategoryList = async () => {
  try {
    const { data: res } = await listArticles(listParams)
    listData.total = res.data.total
    listData.items = res.data.items
  } catch (e) {
    console.log(e)
  }
}
// 获取分类信息
const getCategories = async () => {
  try {
    const { data: res } = await listCategories()
    categories.value = res.data
  } catch (e) {
    console.log(e)
  }
}
//  🌟🌟🌟🌟🌟🌟 接口👆 🌟🌟🌟🌟🌟🌟🌟

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
