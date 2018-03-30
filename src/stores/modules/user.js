import * as types from '../mutation-types'
import { clientApi } from '../../helpers/clientApi'
import { values } from 'ramda'

const state = {
  users: [],
  userForm: {
    fullname: '',
    email: '',
    password: '',
    created_at: '',
    updated_at: ''
  }
}

const getters = {
  getUsers: () => state.users,
  getUser: () => state.user
}

const mutations = {
  [types.SET_USER](sub, user) {
    state.userForm = { ...user }
  },
  [types.UPDATE_USER_FORM](sub, payload) {
    state.userForm[payload.key] = payload.value
  },
  [types.SET_USERS](sub, users) {
    state.users = [...users]
  },
  [types.ADD_USER](sub, newUser) {
    state.users.push(newUser)
  },
  [types.RESET_USER_FORM](sub) {
    for (let key in state.user) {
      state.userForm[key] = ''
    }
  },
  [types.DELETE_USER](sub, id) {
    const users = [...state.users]
    let index = null
    for (let key in users) {
      if (users[key]._id === id) {
        index = key
        break
      }
    }
    if (index) {
      state.users.splice(index, 1)
    }
  },
  [types.UPDATE_USER](sub, {id, data}) {
    const users = [...state.users]
    let index = null
    for (let key in users) {
      if (users[key]._id === id) {
        index = key
        break
      }
    }
    if (index) {
      const user = { ...state.users[index], ...data }
      state.users[index] = user
    }
  }
}

const actions = {
  fetchUsers ({commit, dispatch}) {
    clientApi('users')
      .then(response => {
        const users = response.val()
        console.log(users, 'important')
        commit('SET_USERS', values(users))
      })
      .catch(error => {
        console.log(error)
      })
  },
  updateUser({commit}, {id, data}) {
    clientApi('put', `users/updateProfile/${id}`, data)
      .then(response => {
        commit('UPDATE_USER', {id, data})
      })
      .catch(error => {
        console.log(error)
      })
  },
  createUser ({ commit, rootState }) {
    const { userForm } = rootState.users
    const regUser = {
      email: userForm.email,
      password: userForm.password
    }
    clientApi('post', 'users/signup', regUser)
      .then((response) => {
        const newUser = {
          fullname: userForm.fullname,
          role: 10
        }
        const id = response.data.resUser.id
        clientApi('put', `users/updateProfile/${id}`, newUser)
        commit('ADD_USER', { newUser })
        const payload = {
          type: 'success',
          msg: 'USER created',
          auto: true
        }
        commit('SET_ALERT', payload)
        commit('DISPLAY_ALERT')
        if (payload.auto) {
          setTimeout(() => {
            commit('DISPLAY_ALERT')
          }, 2000)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  removeUser ({commit}, id) {
    clientApi('delete', `users/${id}`)
      .then(response => {
        commit('DELETE_USER', id)
      })
      .catch(error => {
        console.log(error)
      })
  },
  usersFilter ({ commit }, value) {
    clientApi('get', 'statistics/getUsers')
      .then(response => {
        const { users } = response.data
        const filteredUsers = users.filter(user => user.role === Number(value))
        commit('SET_USERS', filteredUsers)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
