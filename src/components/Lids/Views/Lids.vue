<template>
  <div class="row">
   <div class="col-md-12">
    <alert :alert="alert" />
   </div>
   <div class="col-md-12">
      <div class="card">
        <paper-table 
          :title="table.title" 
          :sub-title="table.subTitle" 
          :data="table.data" 
          :columns="table.columns"
          :actions="table.actions"
          @clickDelete="handleDeleteLid"
          @clickUpdate="handleUpdateLid"
        />
      </div>
    </div>
  </div>
</template> 

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
  import { tableColumns, tableActions } from './TableMock.js'
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  export default {
    components: {
      PaperTable
    },
    data: () =>
      ({
        tableActions,
        tableColumns,
        table: {
          title: 'Список заявок',
          subTitle: 'Список заявок полученных в приложении',
          columns: [...tableColumns],
          actions: [...tableActions],
          data: []
        }
      }),
    mounted() {
      this.fetchLids()
    },
    watch: {
      lids(value) {
        if (value) {
          this.table.data = [...value]
        }
      }
    },
    computed: {
      ...mapGetters({
        lids: 'getLids'
      }),
      ...mapState({
        alert: state => state.alert,
        user: state => state.user
      })
    },
    methods: {
      deleteCategoryHandle (value) {
        this.removeCategory({ id: value })
      },
      ...mapActions({
        fetchLids: 'fetchLids',
        handleDeleteLid: 'removeLid',
        handleUpdateLid: 'updateLid'
      })
    }
  }
</script>

<style lang="css" scoped>
  .newUserButton {
   margin: 10px 0px;
  }

  .alert {
    margin: 0px 0px 10px;
  }
</style> 
