<script lang="ts" setup name="registerPage">
import { reactive, ref } from 'vue'
import { User, Collection, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { register } from '@/apis/auth'

const router = useRouter()

// 状态：表单数据
const formData = reactive({
  username: '',
  password: '',
  nickname: ''
})

// 表单验证规则
const formRules = {
  username: {
    required: true,
    trigger: 'blur',
    message: '账号是必填项'
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '密码是必填项'
  },
  nickname: {
    required: true,
    trigger: 'blur',
    message: '昵称是必填项'
  }
}

// 状态：表单组件的引用
const registerForm = ref<any>(null)

// 事件监听：点击注册按钮
const registerHandler = async () => {
  // TODO：完成注册逻辑
  const valid = await registerForm.value
    .validate()
    .catch((e: object) => console.log(e))
  if (!valid) return false
  await register(formData)
  ElMessage({
    message: '注册成功，即将前往登录页',
    type: 'success'
  })
  setTimeout(() => {
  router.replace('/sign/login')
  }, 2000)
}
</script>

<template>
  <el-form
    :model="formData"
    :rules="formRules"
    ref="registerForm"
    class="login-form"
    status-icon
  >
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="formData.username"
        autocomplete="off"
        placeholder="您的账号"
      >
        <template #prefix>
          <el-icon><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="formData.password"
        autocomplete="off"
        placeholder="设置密码"
      >
        <template #prefix>
          <el-icon><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="nickname">
      <el-input
        type="text"
        v-model="formData.nickname"
        autocomplete="off"
        placeholder="您的昵称"
      >
        <template #prefix>
          <el-icon><collection /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="success"
        round
        class="btn-register"
        @click="registerHandler"
      >
        注 册
      </el-button>
      <router-link to="/sign/login" class="msg-register">
        已有账号？去登录
      </router-link>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.btn-register {
  width: 100%;
}
.msg-register {
  margin: 10px 0;
  padding: 0;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: #969696;
}
::v-deep .el-icon {
  height: 40px;
  line-height: 40px;
}
</style>
