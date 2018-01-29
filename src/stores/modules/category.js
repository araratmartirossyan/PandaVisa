import * as types from '../mutation-types'
import { clientApi } from '../../helpers/clientApi'
import moment from 'moment'

const state = {
  category: {
    poster: '',
    title: '',
    titlecn: '',
    icon: '',
    parentId: 'none',
    created_at: '',
    updated_at: ''
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
      icon: 'none',
      created_at: currentDate.toString(),
      updated_at: currentDate.toString()
    }
    clientApi('post', 'categories', newCategory)
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
    const newCategory = { ...category, updated_at: currentDate.toString() }
    clientApi('put', `categories/${id}`, newCategory)
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
    clientApi('delete', `categories/${id}`)
      .then(response => {
        commit('REMOVE_CATEGORY', id)
        const payload = {
          type: 'success',
          msg: 'Category deleted',
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
    clientApi('get', `categories/single/${id}`)
      .then(response => {
        const data = response.data.foundCategory
        const category = {
          poster: data.poster,
          title: data.title,
          titlecn: data.titlecn,
          icon: data.icon,
          type: data.type,
          parentId: data.parentId,
          created_at: data.created_at,
          updated_at: data.updated_at
        }
        commit('SET_CATEGORY', category)
      })
      .catch(error => console.log(error))
  },
  fetchCategories ({ commit, rootState }, { id }) {
    clientApi('get', `categories/${id}`)
      .then((response) => {
        const { data } = response
        const categoriesData = Object.values(data.data)
        categoriesData.splice(categoriesData.length - 1, 1)
        const categories = categoriesData.map((item, index) => {
          const cat = {
            _id: item._id,
            title: item.title,
            titlecn: item.titlecn,
            poster: item.poster,
            icon: item.icon,
            parent: item.parentId,
            created_at: moment(item.created_at).format('YYYY-MM-DD'),
            updated_at: moment(item.updated_at).format('YYYY-MM-DD')
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
