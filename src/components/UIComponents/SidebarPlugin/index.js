import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Статистика',
      icon: 'ti-panel',
      path: '/dashboard'
    },
    {
      name: 'Услуги',
      icon: 'ti-menu-alt',
      path: '/categories/list'
    },
    {
      name: 'Пользователи',
      icon: 'ti-user',
      path: '/users/list'
    },
    {
      name: 'Заявки',
      icon: 'ti-eye',
      path: '/lids/list'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Reflect.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
