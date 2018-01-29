import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import category from './modules/category'
import users from './modules/user'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    category,
    users,
    dashboard
  },
  actions,
  strict: true
})
