<template>
  <div class="row">
   <div class="col-md-12">
     <router-link class="btn btn-primary pull-right newUserButton" to="/categories/add">Add new Category</router-link>
   </div>
   <div class="col-md-12">
     <alert :alert="alert"></alert>
   </div>
   <div class="col-md-12">
      <div class="card">
        <paper-table 
          :title="table.title" 
          :sub-title="table.subTitle" 
          :data="table.data" 
          :columns="table.columns"
          :actions="table.actions"
          @clickDelete="deleteCategoryHandle"
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
    data () {
      return {
        tableActions,
        tableColumns,
        table: {
          title: 'Categories List',
          subTitle: 'All categories in website',
          columns: [...tableColumns],
          actions: [...tableActions],
          data: []
        }
      }
    },
    mounted() {
      this.fetchCategories({ id: this.user.id })
    },
    watch: {
      categories (value) {
        if (value) {
          this.table.data = [...value]
        }
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getCategories'
      }),
      ...mapState({
        alert: state => state.alert,
        user: state => state.user
      })
    },
    methods: {
      deleteCategoryHandle (value) {
        const id = value
        this.removeCategory({ id })
      },
      ...mapActions({
        fetchCategories: 'fetchCategories',
        removeCategory: 'removeCategory'
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
