import { reactive } from "vue";
import { captcha } from "@/apis/auth";

export function useCaptcha() {
  const captchaData = reactive({
    captchaKey: '',
    captchaImage: ''
  })

  const refreshCaptcha = async () => {
    try {
      const { key, svg } = await captcha()
      captchaData.captchaKey = key
      captchaData.captchaImage = svg
    } catch (e) {
      console.log(e)
    }
  }

  return { captchaData, refreshCaptcha }
}