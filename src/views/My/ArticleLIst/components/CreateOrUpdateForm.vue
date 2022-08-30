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
          :init="editorOptions"
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
import { defineComponent, watch, reactive, PropType, ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { createArticle, updateArticle } from '@/apis/articles'
import { baseURL } from '@/utils/request'
import { uploadImage } from '@/apis/upload'
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

// 状态：富⽂本编辑器 TinyMCE 的配置
const editorOptions = reactive({
  // 编辑器⾼度
  height: 500,
  // 不显⽰顶部菜单栏
  menubar: false,
  // 不显⽰底部 TinyMCE 的版权⽂字
  branding: false,
  // 界⾯使⽤的⽪肤⽂件路径
  skin_url: '/tinymce/skins/ui/oxide',
  // 启⽤的插件
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code image wordcount'
  ],
  // 启⽤的⼯具栏按钮
  toolbar: [
    'undo redo | formatselect | forecolor bold italic backcolor | ',
    'alignleft aligncenter alignright alignjustify | ',
    'bullist numlist outdent indent | ',
    'removeformat | image fullscreen'
  ].join(''),
  // 编辑器初始显⽰内容
  contentValue: formData.content,

  images_upload_handler: async (blobInfo: any, success: any, failure: any) => {
    try {
      // 获取要上传的文件，拼装成 FormData 格式的表单数据
      console.log(blobInfo)
      const fd = new FormData()
      fd.append('file', blobInfo.blob(), blobInfo.filename())

      // 调用接口，执行文件上传
      const {data:res} = await uploadImage(fd)

      // 将后端返回的上传后的图片路径（相对路径），拼接成完整路径
      // 然后调用 success 回调函数来通知 TinyMCE 编辑器该图片路径
      success(baseURL + res.data.location)
    } catch (e) {}
  }
})

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
const submitHander = async () => {
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
