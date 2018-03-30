import Vue from 'vue'
import VueRouter from 'vue-router'
import wilddog from 'wilddog'
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

import routes from './routes/routes'
import store from './stores/index'

import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

const config = {
  syncURL: 'https://wd8999575559cftsdb.wilddogio.com',
  authDomain: 'wd8999575559cftsdb.wilddog.com'
}
wilddog.initializeApp(config)

export const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.mustAuth)) {
    return localStorage.token ? next() : next('/login')
  }
  next()
})

Vue.use(VueRouter)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(SideBar)

Reflect.defineProperty(Vue.prototype, '$Chartist', {
  get() {
    return this.$root.Chartist
  }
})

/* eslint-disable */
new Vue({
  el: '#app',
  render: (h) => h(App),
  store,
  router,
  data: {
    Chartist
  },
  watch: {
    user() {
      this.$router.push('/')
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    isAuth() {
      return this.$store.getters.isAuth
    }
  },
  mounted() {
    console.log('storage', localStorage.token)
    if (localStorage.token === undefined) {
      this.$router.push('/login')
    } else {
      this.$store.dispatch('getUser')
      this.$router.push('/')
    }
  }
})
