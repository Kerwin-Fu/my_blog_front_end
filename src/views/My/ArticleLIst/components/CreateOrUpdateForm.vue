<template>
  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogStatus.isVisible"
    center
    fullscreen
    :title="dialogStatus.isEdit ? '修改文章' : '新增文章'"
    :show-close="false"
    :before-close="cancelHandler"
  >
    <!-- 弹窗中的表单 -->
    <el-form
      ref="dialogForm"
      label-width="100px"
      class="article-form"
      status-icon
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input
          type="text"
          autocomplete="off"
          v-model="formData.title"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="formData.categoryId">
          <el-option
            v-for="category in categories"
            :key="category._id"
            :label="category.name"
            :value="category._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章概要" prop="summary">
        <el-input
          type="textarea"
          placeholder="请输入文章概要介绍"
          v-model="formData.summary"
          :rows="3"
        ></el-input>
      </el-form-item>

      <el-form-item label="文章正文" prop="content" class="edit-main">
        <editor
          api-key="xvwbijcyq6aimr3uutqz5f3xtcrqm6muotg2h9ikis0wujy0"
          v-model="formData.content"
          tinymce-script-src="/tinymce/tinymce.min.js"
          :init="{
            selector: 'textarea',
            height: 500,
            menubar: false,
            branding: false,
            plugins:
              'lists link image help wordcount advlist autolink charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount',
            toolbar:
              'undo redo | formatselect forecolor bold italic |backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen'
          }"
        />
      </el-form-item>
    </el-form>

    <!-- 弹窗底部的按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="default" @click="cancelHandler"> 取 消 </el-button>
        <el-button type="primary" @click="submitHander"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineComponent, watch, reactive, PropType,ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { createArticle, updateArticle } from '@/apis/articles';
defineComponent({
  name: 'CreateOrUpdateForm'
})

interface Category {
  createAt: string
  name: string
  _id: string
}

const emit = defineEmits(['update:visible', 'complete'])
const props = defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    dafault: () => ({})
  },
  article: {
    type: Object,
    dafault: () => ({})
  },
  visible: {
    type: Boolean,
    default: false
  }
})

// 弹出框表单的 ref 绑定
const dialogForm = ref<any>(null)

// 弹出框的内容
const formData = reactive({
  _id: '',
  title: '',
  summary: '',
  content: '',
  categoryId: ''
})

// 表单校验
const formRules = {
  title: {
    required: true,
    trigger: 'blur',
    message: '⽂章标题是必填项'
  },
  categoryId: {
    required: true,
    trigger: 'blur',
    message: '⽂章分类是必填项'
  }
}

// 弹出框的状态
const dialogStatus = reactive({
  isVisible: false,
  isEdit: false
})

// 取消操作文章
const cancelHandler = () => {
  dialogStatus.isVisible = false
  emit('update:visible', false)
}

// 提交文章按钮
const submitHander = async() => {
  await dialogForm.value.validate()
  if (dialogStatus.isEdit) {
    await updateArticle(formData)
  } else {
    await createArticle(formData)
  }
  emit('complete', dialogStatus.isEdit)
  cancelHandler()
}


watch([() => props.visible, props.article], (newVals) => {
  const [visible, article] = newVals
  ;(dialogStatus.isVisible = !!visible), (dialogStatus.isEdit = !!article?._id)
  formData._id = article?._id
  formData.title = article?.title
  formData.summary = article?.summary
  formData.content = article?.content
  formData.categoryId = article?.categoryId
})
</script>

<style lang="scss" scoped>
.article-form {
  width: 960px;
  margin: 0 auto;
}
</style>

<style>
.tox-tinymce-aux {
  z-index: 9999999 !important;
}
</style>
