<template>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="card">
              <div class="header">
                <h4 class="title">Category Form</h4>
              </div>
              <div class="content">
                <form>
                  <fg-input type="text"
                    v-for="(index, key) in fields"
                    :key="key"
                    :label="index.label"
                    :placeholder="index.placeholder"
                    @changeValue="handleSetUser"
                    :name="index.name"
                    :value="form[index.value]"
                  />
                  <div class="text-center">
                    <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="submitForm">
                      Submit
                    </button>
                    <router-link to="/categories/list" class="btn btn-danger btn-fill btn-wd">Back</router-link>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { fields } from './TableMock.js'

export default {
  data: () => ({
    id: '',
    fields
  }),
  mounted () {
    this.id = this.$route.params.id
    this.resetForm()
    if (this.id) {
      this.fetchCategory({ id: this.id })
    }
  },
  computed: {
    ...mapState({
      form: state => state.category.category
    })
  },
  methods: {
    submitForm () {
      const id = this.id ? this.id : ''
      if (id) {
        this.updateUser({ id })
      } else {
        this.createUser()
      }
      this.$router.push('/users/list')
    },
    ...mapActions({
      fetchUser: 'fetchUser',
      createUser: 'createUser',
      updateUser: 'updateUser'
    }),
    ...mapMutations({
      resetForm: 'RESET_USER_FORM'
    }),
    handleSetUser(value, name) {
      const payload = {
        key: name,
        value
      }
      this.$store.commit('UPDATE_USER_FORM', payload)
    }
  }
}
</script>

<style lang="" scoped>

</style>
