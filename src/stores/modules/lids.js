import * as types from '../mutation-types'
import {
  clientApi,
  clientApiPut,
  clientApiDelete
} from '../../helpers/clientApi'
import moment from 'moment'

const state = {
  lids: []
}

const getters = {
  getLids: () => state.lids
}

const mutations = {
  [types.SET_LIDS](sub, categories) {
    state.lids = [...categories]
  },
  [types.UPDATE_LID](sub, category, id) {
    const p = state.categories.indexOf(item => item._id === id)
    state.lids[p] = { ...category }
  },
  [types.REMOVE_LID](sub, id) {
    const p = state.categories.indexOf(item => item._id === id)
    state.categories.splice(p, 1)
  }
}

const actions = {
  updateLid({ commit, dispatch }, id) {
    console.log('do it', id)
    const newCategory = {
      isVerified: true,
      updated_at: Date.now().toString()
    }
    clientApiPut(`lids/${id}`, newCategory)
      .then(response => {
        commit('UPDATE_CATEGORY', newCategory, id)
        const payload = {
          type: 'success',
          msg: 'Category updated',
          auto: true
        }
        commit('SET_ALERT', payload)
        commit('DISPLAY_ALERT')
        setTimeout(() => {
          commit('DISPLAY_ALERT')
          dispatch('fetchLids')
        }, 2000)
      })
      .catch(error => console.log(error))
  },
  removeLid({ commit, dispatch }, id) {
    clientApiDelete(`lids/${id}`)
      .then(response => {
        commit('REMOVE_CATEGORY', id)
        dispatch('fetchLids')
        const payload = {
          type: 'success',
          msg: 'Услуга удалена',
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
      .catch(error => console.log(error))
  },
  fetchLids({ commit, rootState }) {
    clientApi('lids')
      .then(response => {
        let lids = []
        const list = response.val()
        for (let key in list) {
          let value = list[key]
          if (value) {
            value = {
              ...value,
              _id: key,
              created_at: moment(value.createdAt).format('YYYY-MM-DD'),
              isVerified: value.isVerified ? 'Проверено' : 'Не проверено'
            }
            lids.push(value)
          }
        }
        commit('SET_LIDS', lids)
      })
      .catch(error => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
