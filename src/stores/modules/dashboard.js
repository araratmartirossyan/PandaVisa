import * as types from '../mutation-types'
// import { clientApi } from '../../helpers/clientApi'
import moment from 'moment'
import { countBy } from 'ramda'

const state = {
  newUsers: 0,
  newCases: 0,
  sharedCases: 0,
  hottestCategory: '',
  chartData: {
    labels: [],
    series: []
  }
}

const getters = {
  getItemsStats: (stat) => state[stat]
}

const mutations = {
  [types.SET_STATS](sub, payload) {
    state[payload.key] = payload.value
  },
  [types.SET_CHART_DATA](sub, payload) {
    const days = payload.dates.map(item => moment(item.created_at).format('MMM D'))
    const daysCount = countBy(String)(days)
    const start = moment()
      .startOf('day')
      .valueOf()
    const serie = []
    const labels = []
    for (let i = payload.days; i >= 1; i--) {
      const label = moment(start)
        .subtract(i, 'days')
        .valueOf()
      const date = moment(label).format('MMM D')
      labels.push(date)
      if (daysCount[date]) {
        serie.push(daysCount[date])
      } else {
        serie.push(0)
      }
    }
    state.chartData.labels = [...labels]
    state.chartData.series = []
    state.chartData.series.push(serie)
  },
  [types.SET_FAVOURITE_ITEM](sub, favourite) {
    state.hottestCategory = favourite
  }
}

const actions = {
  fetchNewItems ({commit}, {from, key}) {
    // clientApi('get', `statistics/newItems/${from}`)
    //   .then(response => {
    //     const { count } = response.data
    //     const payload = { key, value: count }
    //     commit('SET_STATS', payload)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  fetchTotalItems ({commit}, {type, action, key}) {
    // clientApi('get', `statistics/totalItems/${type}/${action}`)
    //   .then(response => {
    //     const { count } = response.data
    //     const payload = { key, value: count }
    //     commit('SET_STATS', payload)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  fetchChartData({commit}, {from, days}) {
    // clientApi('get', `statistics/chartItems/${from}/${days}`)
    //   .then(response => {
    //     const { data } = response
    //     const { dates } = data
    //     const payload = {days, dates}
    //     commit('SET_CHART_DATA', payload)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  fetchFavouriteItem({commit}) {
    // clientApi('get', 'statistics/mostPopularItems')
    //   .then(response => {
    //     const { data } = response
    //     const { favourite } = data
    //     commit('SET_FAVOURITE_ITEM', favourite)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
