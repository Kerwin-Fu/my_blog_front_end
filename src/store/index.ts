import { createStore, Store } from "vuex";
import { login } from '../apis/auth'
import { getUserProfile, updateAvatar, updateBaseInfo, updatePassword } from '../apis/profiles'

const store = createStore({
  state: {
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(JSON.stringify(localStorage.getItem('userInfo')) || "{}")
  },
  mutations: {
    setToken(state, token) {
      state.token = token

      if (state.token) {
        localStorage.setItem('token', state.token)
      } else {
        localStorage.removeItem('token')
      }
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      if (state.userInfo.userInfo) {

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
      } else {
        localStorage.removeItem('userInfo')
      }

    }
  },
  actions: {
    async login({ commit }, loginParams) {
      const { data: res } = await login(loginParams)
      commit('setToken', res.data)
    },

    async getUserInfo({ commit }) {
      const { data: res } = await getUserProfile()

      commit('setUserInfo', res.data)
    },

    async clearLogin({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', {})
    },

    async updateProfileAvatar(store, avatar) {
      await updateAvatar(avatar)
      store.commit('setUserInfo', {
        ...store.state.userInfo,
        avatar
      })
    },

    async updateProfileBaseInfo(store, params) {
      await updateBaseInfo(params)
      store.commit('setUserInfo', {
        ...store.state.userInfo,
        ...params
      })
    },

    async updateProfilePassword(store, params) {
      await updatePassword(params)
    }
  }
})

export default store