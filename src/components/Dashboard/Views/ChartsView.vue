<template>
  <div class="col-md-12">

    <chart-card :chart-data="chartData" :chart-options="chartOptions">
      <h4 class="title" slot="title">New users last {{ days }} days</h4>
      <select
        v-model="days" 
        class="form-control" 
        slot="filters">
        <option value="7">Last 7 days</option>
        <option value="15">Last 15 days</option>
        <option value="30">Last 30 days</option>
      </select>
    </chart-card> 
  </div>
</template>

<script>
import ChartCard from 'components/UIComponents/Cards/ChartCard.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    ChartCard
  },
  data () {
    return {
      days: 7,
      chartOptions: {
        axisY: {
          labelInterpolationFnc: (value) => (value % 1 === 0) ? value : ''
        }
      }
    }
  },
  watch: {
    days (value) {
      console.log(value)
      this.fetchChartData({ from: 'users', days: value })
    }
  },
  mounted () {
    this.fetchChartData({ from: 'users', days: this.days })
  },
  computed: {
    ...mapState({
      chartData: state => state.dashboard.chartData
    })
  },
  methods: {
    ...mapActions({
      fetchChartData: 'fetchChartData'
    })
  }
}
</script>

<style lang="">
    
</style>
