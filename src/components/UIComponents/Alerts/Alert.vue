<template>
    <div v-if="alert.display" :class="style">
        {{ alert.msg }}
        <button v-if="!alert.auto" type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</template>

<script>
    export default {
      props: {
        alert: Object
      },
      computed: {
        style() {
          const type = this.alert.type
          let reply = 'alert '
          switch (type) {
            case 'success':
              reply += 'alert-success'
              break
            case 'danger':
              reply += 'alert-danger'
              break
            case 'warning':
              reply += 'alert-warning'
              break
            default:
              reply += 'alert-info'
          }
          return reply
        }
      }
    }
</script>

<style lang="css" scoped>
  
</style>
