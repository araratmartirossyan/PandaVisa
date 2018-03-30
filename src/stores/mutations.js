/* eslint-disable */

import * as types from './mutation-types'
import { pathOr } from 'ramda'

export default {
  [types.USER_LOGIN](state, login) {
    state.login = login
  },
  [types.SET_LOGIN_USER_UID](state, token) {
    state.login_user_uid = token
  },
  [types.UPDATE_CREDS](state, payload) {
    state.credentials[payload.key] = payload.value
  },
  [types.SET_ALERT](state, payload) {
    state.alert.type = payload.type
    state.alert.msg = payload.msg
    state.alert.auto = payload.auto
  },
  [types.DISPLAY_ALERT](state) {
    state.alert.display = !state.alert.display
  },
  [types.USER](state, userData) {
    state.user = userData
    const uid = pathOr(false, ['uid'], userData)
    if (uid) {
      state.loadingUser = false
      let token = userData.uid
      window.localStorage.setItem('token', token)
    }
  },
  [types.LOADING_USER](state, loadingState) {
    state.loadingUser = loadingState
  },
  [types.LOGIN_MODEL](state, model) {
    state.signupModel = false
    state.loginModel = model
  },
  [types.SIGNUP_MODEL](state, model) {
    state.loginModel = false
    state.signupModel = model
  },
  [types.USER_SIGNOUT](state) {
    state.login = false
    state.loginModel = false
    state.signupModel = false
    state.user = {}
    localStorage.removeItem('token')
  },
  [types.LOGIN_ERROR](state, error) {
    state.loginError = error
  }
}
