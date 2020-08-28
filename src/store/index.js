import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    name:'',
    avatar:'',
    roles:[],
    premissions:[]
  },
  mutations: {
    SET_TOKEN: (state,token) => {
      state.token = token
    },
    SET_NAME: (state,name) => {
      state.name = name
    },
    SET_AVATAR: (state,avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state,roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state,permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
  
  },
  modules: {
  }
})
