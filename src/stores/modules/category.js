import * as types from '../mutation-types'
import {
  clientApi,
  clientApiPush,
  clientApiPut,
  clientApiDelete
} from '../../helpers/clientApi'
import moment from 'moment'

const state = {
  category: {
    poster: '',
    title: '',
    text: '',
    created_at: '',
    updated_at: '',
    linkedId: ''
  },
  categories: [],
  parentCats: []
}

const getters = {
  getCategories: () => state.categories,
  getCategory: () => state.category
}

const mutations = {
  [types.SET_CATEGORY](sub, category) {
    state.category = { ...category }
  },
  [types.SET_POSTER](sub, poster) {
    state.category.poster = poster
  },
  [types.UPDATE_CATEGORY_FORM](sub, payload) {
    console.log(sub, payload)
    state.category[payload.key] = payload.value
  },
  [types.SET_CATEGORIES](sub, categories) {
    state.categories = [...categories]
  },
  [types.RESET_CATEGORY](sub) {
    for (let key in state.category) {
      state.category[key] = ''
    }
    state.category.parentId = 'none'
    state.category.poster = 'none'
  },
  [types.ADD_CATEGORY](sub, category) {
    state.categories.push(category)
  },
  [types.UPDATE_CATEGORY](sub, category, id) {
    const p = state.categories.indexOf(item => item._id === id)
    state.categories[p] = { ...category }
  },
  [types.REMOVE_CATEGORY](sub, id) {
    const p = state.categories.indexOf(item => item._id === id)
    state.categories.splice(p, 1)
  },
  [types.GET_PARENT_CATEGORIES](sub) {
    const categories = []
    state.categories.map(item => {
      if (item.parent === 'none') {
        const obj = {
          value: item._id,
          name: item.title
        }
        categories.push(obj)
      }
      return item
    })
    state.parentCats = categories
  }
}

const actions = {
  createCategory ({ commit, rootState }) {
    const { category } = rootState.category
    const currentDate = Date.now()
    const newCategory = {
      ...category,
      created_at: currentDate.toString(),
      updated_at: currentDate.toString()
    }
    clientApiPush('settings', newCategory)
      .then((response) => {
        commit('ADD_CATEGORY', { newCategory })
        const payload = {
          type: 'success',
          msg: 'Category created',
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
      .catch((error) => console.log(error))
  },
  updateCategory ({ commit, rootState }, { id }) {
    const { category } = rootState.category
    const currentDate = Date.now()
    const newCategory = {
      ...category,
      updated_at: currentDate.toString()
    }
    clientApiPut(`settings/${id}`, newCategory)
      .then(response => {
        commit('UPDATE_CATEGORY', newCategory, id)
        const payload = {
          type: 'success',
          msg: 'Category updated',
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
  removeCategory ({ commit }, { id }) {
    console.log(id, 'important')
    clientApiDelete(`settings/${id}`)
      .then(response => {
        commit('REMOVE_CATEGORY', id)
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
  fetchCategory ({ commit }, { id }) {
    clientApi(`settings/${id}`)
      .then(response => {
        const category = response.val()
        commit('SET_CATEGORY', category)
      })
      .catch(error => console.log(error))
  },
  fetchCategories ({ commit, rootState }) {
    clientApi('settings')
      .then((response) => {
        let categories = []
        const list = response.val()
        for (let key in list) {
          let value = list[key]
          if (value) {
            value._id = key
            value.name = value.title
            categories.push(value)
          }
        }
        categories
          .map((item, index) => {
            const cat = {
              _id: index,
              title: item.title,
              text: item.text,
              poster: item.poster,
              created_at: moment(String(item.created_at)).format('YYYY-MM-DD'),
              updated_at: moment(String(item.updated_at)).format('YYYY-MM-DD')
            }
            return index !== 'postsCount' ? cat : ''
          })
        commit('SET_CATEGORIES', categories)
      })
      .catch((error) => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
