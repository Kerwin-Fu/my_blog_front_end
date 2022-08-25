import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const token = store.state.token

  if (token) {
    if (to.path === '/sign/login') {
      next('/my/articles')
    } else {
      const userInfo = store.state.userInfo

      if (userInfo?.username) {
        next()
      } else {
        try {
          await store.dispatch('getUserInfo')
          next({ ...to, replace: true })
        } catch (e) {
          console.log(e)
          store.dispatch('clearLogin')
          next('/sign/login')
        }
      }
    }
  } else {
    if (to.path.indexOf('/my') === 0) {
      next('/sign/login')
    } else {
      next()
    }
  }
})