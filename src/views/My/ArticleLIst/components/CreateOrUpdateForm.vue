<template>
  <!-- 弹窗 -->
  <el-dialog
    v-model="dialogStatus.isVisible"
    center
    fullscreen
    :title="'新增文章'"
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

      <el-form-item label="文章正文" prop="content">
        <editor
          api-key="xvwbijcyq6aimr3uutqz5f3xtcrqm6muotg2h9ikis0wujy0"
          v-model="formData.content"
          :init="{
            selector: 'textarea',
            height: 500,
            menubar: false,
            branding: false,
            plugins: 'lists link image help wordcount advlist autolink charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount',
            toolbar:
              'undo redo | formatselect | forecolor bold italic |backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen'
          }"
        />
      </el-form-item>
    </el-form>

    <!-- 弹窗底部的按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="default" @click="cancelHandler"> 取 消 </el-button>
        <el-button type="primary"> 确 定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineComponent, watch, reactive, PropType } from 'vue'
import Editor from '@tinymce/tinymce-vue'
defineComponent({
  name: 'CreateOrUpdateForm'
})

interface Category {
  createAt: string
  name: string
  _id: string
}

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

const formData = reactive({
  _id: '',
  title: '',
  summary: '',
  content: '',
  categoryId: ''
})

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

const dialogStatus = reactive({
  isVisible: false,
  isEdit: false
})

const emit = defineEmits(['update:visible'])

const cancelHandler = () => {
  dialogStatus.isVisible = false
  emit('update:visible', false)
}

watch([() => props.visible, props.article], (newVals) => {
  const [visible, article] = newVals
  ;(dialogStatus.isVisible = !!visible), (dialogStatus.isEdit = !!article!._id)
})
</script>

<style lang="scss" scoped>
.article-form {
  width: 960px;
  margin: 0 auto;
}
.tox-tinymce-aux {
  z-index: 9999999;
}
</style>
