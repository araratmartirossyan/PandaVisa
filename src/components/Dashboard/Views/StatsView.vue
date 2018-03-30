<template>
  <div class="col-md-12">
    <div class="col-lg-3 col-sm-6" v-for="(index, key) in stats">
      <stats-card>
        <div 
          class="icon-big text-center icon-success" 
          slot="header"
        >
          <i :class="[index.icon]" />
        </div>
          <div class="numbers" slot="content">
            <p>{{index.name}}</p> 0
          </div>
      </stats-card>
    </div>
  </div>
</template>

<script>
  import StatsCard from '../../UIComponents/Cards/StatsCard.vue'
  import { mapState, mapActions } from 'vuex'
  import { stats } from './stats.mock.js'
  export default {
    data: () => ({ stats }),
    components: {
      StatsCard
    },
    mounted () {
      this.fetchNewItems({from: 'users', key: 'newUsers'})
      this.fetchNewItems({from: 'posts', key: 'newCases'})
      this.fetchTotalItems({type: 'post', action: 'shares', key: 'sharedCases'})
      this.fetchFavouriteItem()
    },
    computed: {
      ...mapState({
        newUsers: state => state.dashboard.newUsers,
        newCases: state => state.dashboard.newCases,
        sharedCases: state => state.dashboard.sharedCases,
        hottestCategory: state => state.dashboard.hottestCategory
      })
    },
    methods: {
      ...mapActions({
        fetchNewItems: 'fetchNewItems',
        fetchTotalItems: 'fetchTotalItems',
        fetchFavouriteItem: 'fetchFavouriteItem'
      })
    }
  }
</script>

<style lang="">
    
</style>
