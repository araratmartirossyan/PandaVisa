<template>
  <div class="card">
    <div class="header">
      <div class="col-md-6">
        <slot name="title"></slot>
      </div>
      <div class="col-md-6">
        <slot name="filters"></slot>
      </div>
    </div>
    <div class="content">
      <div :id="chartId" class="ct-chart"></div>
      <div class="footer" v-if="footerText">
        <div class="chart-legend">
          <slot name="legend"></slot>
        </div>
        <hr>
        <div class="stats">
          <slot name="footer"></slot>
        </div>
        <div class="pull-right">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'chart-card',
    props: {
      footerText: {
        type: String,
        default: ''
      },
      headerTitle: {
        type: String,
        default: 'Chart title'
      },
      chartType: {
        type: String,
        default: 'Line' // Line | Pie | Bar
      },
      chartOptions: {
        type: Object,
        default: () => {}
      },
      chartData: {
        type: Object,
        default: () => ({
          labels: [],
          series: []
        })
      }
    },
    data () {
      return {
        chartId: 'no-id'
      }
    },
    watch: {
      'chartData.labels' () {
        this.initChart()
      }
    },
    methods: {
      /***
       * Initializes the chart by merging the chart options sent via props and the default chart options
       */
      initChart () {
        var chartIdQuery = `#${this.chartId}`
        if (this.chartData.labels.length > 15) {
          this.chartOptions = {
            ...this.chartOptions,
            axisX: {
              labelInterpolationFnc(value, index) {
                return index % 3 === 0 ? value : null
              }
            }
          }
        }
        this.$Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions)
      },
      /***
       * Assigns a random id to the chart
       */
      updateChartId () {
        const currentTime = new Date()
          .getTime()
          .toString()
        const randomInt = this.getRandomInt(0, currentTime)
        this.chartId = `div_${randomInt}`
      },
      getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    },
    mounted () {
      this.updateChartId()
      this.$nextTick(this.initChart)
    }
  }

</script>

<style>
</style>
