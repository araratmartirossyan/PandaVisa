import * as types from '../mutation-types'
import { clientApi, clientApiPut } from '../../helpers/clientApi'

const state = {
  currency: {
    rub: '',
    cny: '',
    uch: ''
  }
}

const getters = {
  currency: () => state.currency
}

const mutations = {
  [types.handleSetCurrency](payload, { key, value }) {
    state.currency[key] = value
  },
  [types.setCurrency](payload, data) {
    state.currency = data
  }
}

const actions = {
  handleUpdateCurrency({ state, commit }) {
    const { currency } = state
    clientApiPut('currency', currency)
      .then(() => {
        const payload = {
          type: 'success',
          msg: 'Курс валют обновлен',
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
  },
  handleFetchCurrency({ commit }) {
    clientApi('currency')
      .then(data => commit('setCurrency', data.val()))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
