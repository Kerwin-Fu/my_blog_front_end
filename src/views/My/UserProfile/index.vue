<template>
  <div class="profile-container">
    <!-- 个人资料展示 -->
    <el-form label-width="100px" label-position="left">
      <el-form-item label="头像">
        <div class="avatar-container">
          <div class="avatar">
            <img
              class="avatar-img"
              :src="getAvatarImage(profile?.avatar)"
              alt=""
            />
          </div>

          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="sendUploadRequest"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="text"> 更换 </el-button>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="账号">
        <div>{{ profile?.username }}</div>
      </el-form-item>

      <el-form-item label="昵称">
        <div class="form-item-inline">
          <div>{{ profile?.nickname }}</div>
          <el-button type="text" @click="editBaseInfoHandler"> 修改 </el-button>
        </div>
      </el-form-item>

      <el-form-item label="密码">
        <div class="form-item-inline">
          <div>********</div>
          <el-button type="text" @click="editPasswordHandler"> 修改 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  <edit-base-info-form v-model:visible="dialogEditBaseVisible" />
  <edit-password-form v-model:visible="dialogEditPassVisible" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getAvatarImage } from '@/utils/resource'
import { uploadImage } from '@/apis/upload'
import EditBaseInfoForm from './components/EditBaseInfoForm.vue'
import EditPasswordForm from './components/EditPasswordForm.vue'

// 获取状态管理器
const store = useStore()
const dialogEditBaseVisible = ref<boolean>(false)
const dialogEditPassVisible = ref<boolean>(false)

// 用户信息
const profile = computed(() => store.state.userInfo)

const beforeAvatarUpload = (file: File) => {
  const isValidFormat = file.type === 'image/jpeg' || file.type === 'image/png'
  const isValidSize = file.size / 1024 / 1024 < 2

  if (!isValidFormat) {
    ElMessage.error('上传头像图片只是能 JPG 或 PNG 格式')
  }

  if (!isValidSize) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }

  return isValidFormat && isValidSize
}

const sendUploadRequest = async (req: any) => {
  try {
    const file = req.file
    const formData = new FormData()
    formData.append('file', file, file.name)

    const { data: res } = await uploadImage(formData)

    store.dispatch('updateProfileAvatar', res.data.location)
  } catch (e) {}
}

const editBaseInfoHandler = () => {
  dialogEditBaseVisible.value = true
}

const editPasswordHandler = () => {
  dialogEditPassVisible.value = true
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding-right: 30px;

  .el-form-item {
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 5px;
    padding: 15px;
  }

  .form-item-inline {
    width: 200px;
    display: flex;
    justify-content: space-between;
  }

  .avatar-container {
    display: flex;
    width: 200px;
    justify-content: space-between;
    align-items: center;

    .avatar {
      width: 98px;
      height: 98px;
      border: 1px solid #dddddd;
      border-radius: 50%;
      padding: 1px;

      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }
}
</style>
