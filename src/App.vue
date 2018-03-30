<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <router-view></router-view>
    <!--This sidebar appears only for screens smaller than 992px-->
    <side-bar type="navbar" :sidebar-links="$sidebar.sidebarLinks">
      <ul class="nav navbar-nav">
        <li>
          <a class="dropdown-toggle" data-toggle="dropdown">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
          <a>
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </ul>
    </side-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    mounted() {
      this.$store.dispatch('getUser')
      if (localStorage.token) {
        const userData = JSON.parse(localStorage.getItem('userCreds'))
        this.$store.commit('USER', userData)
        this.$store.commit('USER_LOGIN', true)
      } else {
        this.$store.commit('USER_LOGIN', false)
      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'isAuth'
      })
    }
  }
</script>
