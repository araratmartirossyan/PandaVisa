<template>
    <div class="row">
        <div class="col-md-12">
          <router-link 
            class="btn btn-primary pull-right newUserButton" 
            to="/users/add"
          >
            Add new Admin
          </router-link>
       </div>
       <div class="col-md-12">
          <div class="header">
            <div class="row">
              <div 
                class="col-md-3" 
                v-for="(filter, key) in tableFilters"
                :key="key">
                <select 
                  class="form-control"
                  :placeholder="filter.label"
                  @change="selectFilter($event.target.value)">
                  <option 
                    :label="filter.label" 
                    value="" 
                  />
                  <option 
                    v-for="(option, key) in filter.options"
                    :key="option.key"
                    :label="option.key"
                    :value="option.value"
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card">
            <paper-table 
              :title="table.title"
              :subTitle="table.subTitle"
              :data="users"
              :columns="table.columns"
              :actions="table.actions"
              @clickSuspend="clickSuspendHandle"
              @clickDelete="clickDeleteHandle"
            />
          </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import PaperTable from 'components/UIComponents/PaperTable.vue'
    import { tableColumns, tableActions, tableFilters } from './TableMock.js'
    export default {
      components: {
        PaperTable
      },
      data () {
        return {
          tableColumns,
          tableActions,
          tableFilters,
          table: {
            title: 'Users List',
            subTitle: 'All users in website',
            columns: [...tableColumns],
            actions: [...tableActions],
            filters: [...tableFilters],
            data: []
          }
        }
      },
      mounted () {
        this.fetchUsers()
      },
      computed: {
        ...mapGetters({
          users: 'getUsers'
        })
      },
      methods: {
        ...mapActions({
          fetchUsers: 'fetchUsers',
          removeUser: 'removeUser',
          updateUser: 'updateUser',
          selectFilter: 'usersFilter'
        }),
        clickSuspendHandle (id) {
          const users = [...this.users]
          let user = null
          for (let key in users) {
            if (users[key]._id === id) {
              user = users[key]
              break
            }
          }
          if (user) {
            const data = {suspended: !user.suspended}
            this.updateUser({id, data})
            this.fetchUsers()
          }
        },
        clickDeleteHandle (id) {
          this.removeUser(id)
        }
      }
    }
</script>

<style lang="">
    
</style>
