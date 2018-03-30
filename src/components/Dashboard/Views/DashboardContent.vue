<template>
    <div class="row">
        <stats-view />
        <hr />
        <!-- <charts-view /> -->
    </div>
</template>

<script>
  import ChartsView from './ChartsView.vue'
  import StatsView from './StatsView.vue'
  export default {
    components: {
      StatsView,
      ChartsView
    }
  }
</script>

<style lang="">
    
</style>
