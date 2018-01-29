import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/dashboard'
    },
    {
      name: 'Categories',
      icon: 'ti-menu-alt',
      path: '/categories/list'
    },
    {
      name: 'Users',
      icon: 'ti-user',
      path: '/users/list'
    }
    // {
    //   name: 'Admin Roles',
    //   icon: 'ti-eye',
    //   path: '/admins/list'
    // }
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
