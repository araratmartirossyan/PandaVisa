<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="col-xs-5">
          <slot name="header"></slot>
        </div>
        <div class="col-xs-7">
          <slot name="content"></slot>
        </div>
      </div>
      <!-- <div class="footer">
        <hr/>
        <slot name="footer"></slot>
      </div> -->
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'stats-card'
  }

</script>
<style scoped>
  .icon-success {
    color: #68B3C8 !important;
  }

  small {
    font-size: 14px;
  }
</style>
