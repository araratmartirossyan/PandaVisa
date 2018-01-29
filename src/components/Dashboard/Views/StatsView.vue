<template>
  <div class="col-md-12">
    <div class="col-lg-3 col-sm-6">
      <stats-card>
          <div class="icon-big text-center icon-success" slot="header">
          <i class="ti-user"></i>
          </div>
          <div class="numbers" slot="content">
          <p>New Users</p>
          {{newUsers}}
          </div>
      </stats-card>
    </div>

    <div class="col-lg-3 col-sm-6">
      <stats-card>
          <div class="icon-big text-center icon-success" slot="header">
          <i class="ti-write"></i>
          </div>
          <div class="numbers" slot="content">
          <p>New Cases</p>
          {{newCases}}
          </div>
      </stats-card>
    </div>

    <div class="col-lg-3 col-sm-6">
      <stats-card>
          <div class="icon-big text-center icon-success" slot="header">
          <i class="ti-share"></i>
          </div>
          <div class="numbers" slot="content">
          <p>Shared Cases</p>
          {{sharedCases}}
          </div>
      </stats-card>
    </div>

    <div class="col-lg-3 col-sm-6">
      <stats-card>
          <div class="icon-big text-center icon-success" slot="header">
            <i class="ti-heart"></i>
          </div>
          <div class="numbers" slot="content">
            <p>Hottest Category</p>
            <small>{{ hottestCategory }}</small>
          </div>
      </stats-card>
    </div>
  </div>
</template>

<script>
  import StatsCard from '../../UIComponents/Cards/StatsCard.vue'
  import { mapState, mapActions } from 'vuex'
  export default {
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
