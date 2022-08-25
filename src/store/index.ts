import { createStore, Store } from "vuex";
import { login } from '../apis/auth'
import { getUserProfile } from '../apis/profiles'

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
      const token = await login(loginParams)
      commit('setToken', token)
    },

    async getUserInfo({ commit }) {
      const profile = await getUserProfile()
      commit('setUserInfo', profile)
    },

    async clearLogin({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', {})
    }
  }
})

export default store