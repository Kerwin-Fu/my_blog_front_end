import { reactive } from "vue";
import { captcha } from "@/apis/auth";

export function useCaptcha() {
  const captchaData = reactive({
    captchaKey: '',
    captchaImage: ''
  })

  const refreshCaptcha = async () => {
    try {
      const { data:res } = await captcha()
      captchaData.captchaKey = res.data.key
      captchaData.captchaImage = res.data.svg
    } catch (e) {
      console.log(e)
    }
  }

  return { captchaData, refreshCaptcha }
}