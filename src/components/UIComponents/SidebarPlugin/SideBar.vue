<template>
  <div 
    :class="sidebarClasses"
    :data-background-color="backgroundColor"
    :data-active-color="activeColor"
  >
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text user-block">
          <div class="logo-img" :style="avatar()" />
          {{user.fullname}}
        </a>
      </div>
      <slot></slot>
      <ul :class="navClasses">
        <router-link 
          v-for="(link,index) in sidebarLinks" 
          :to="link.path" 
          tag="li" 
          :ref="link.name" 
          :key="link.name + index"
        >
          <a>
            <i :class="link.icon"></i>
            <p>{{link.name}}</p>
          </a>
        </router-link>
      </ul>
      <moving-arrow :move-y="arrowMovePx" />
    </div>
  </div>
</template>
<script>
  import MovingArrow from './MovingArrow.vue'
  import { mapGetters } from 'vuex'

  export default {
    props: {
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['white', 'black', 'darkblue']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MovingArrow
    },
    computed: {
      sidebarClasses() {
        return this.type === 'sidebar' ? 'sidebar' : 'collapse navbar-collapse off-canvas-sidebar'
      },
      navClasses() {
        return this.type === 'sidebar' ? 'nav' : 'nav navbar-nav'
      },
      arrowMovePx() {
        return this.linkHeight * this.activeLinkIndex
      },
      ...mapGetters({
        user: 'user'
      })
    },
    data () {
      return {
        linkHeight: 60,
        activeLinkIndex: 0,
        windowWidth: 0,
        isWindows: false,
        hasAutoHeight: false
      }
    },
    methods: {
      avatar() { return `background-image: url(${this.user.avatar}); background-size: cover;` },
      findActiveLink () {
        this.sidebarLinks.find((element, index) => {
          let found = element.path === this.$route.path
          if (found) {
            this.activeLinkIndex = index
          }
          return found
        })
      }
    },
    mounted () {
      this.findActiveLink()
    },
    watch: {
      $route(newRoute, oldRoute) {
        this.findActiveLink()
      }
    }
  }

</script>
<style>
  .user-block {
    display: flex!important;
  }
</style>
