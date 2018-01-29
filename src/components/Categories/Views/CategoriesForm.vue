<template>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="card">
              <div class="header">
                <h4 class="title">Category Form</h4>
              </div>
              <div class="content">
                <form>
                  <ImageUplodaer
                    title="Upload poster"
                    uploading-text="Uploading..."
                    @uploadPoster="setPoster"
                    :poster="form.poster"
                  />
                  
                  <fg-input type="text"
                    v-for="(index, key) in fields"
                    :key="key"
                    :label="index.label"
                    :placeholder="index.placeholder"
                    @changeValue="handleSetCategory"
                    :name="index.name"
                    :value="form[index.value]"
                  />
                  <fg-select label="Parent"
                    @changeValue="handleSetCategory"
                    name="parentId"
                    :selected="form.parentId"
                    :options="parentCats"
                  />
                  <fg-select label="Type"
                    @changeValue="handleSetCategory"
                    name="type"
                    :selected="form.type"
                    :options="types"
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
import { types, fields } from './TableMock.js'
import ImageUplodaer from '../../UIComponents/ImageUploaderPlugin/ImageUploader.vue'

export default {
  data: () => ({
    id: '',
    types,
    fields
  }),
  components: { ImageUplodaer },
  mounted () {
    this.id = this.$route.params.id
    this.resetForm()
    this.getParentCats()
    if (this.id) {
      this.fetchCategory({ id: this.id })
    }
  },
  computed: {
    ...mapState({
      form: state => state.category.category,
      parentCats: state => state.category.parentCats
    })
  },
  methods: {
    submitForm () {
      const id = this.id ? this.id : ''
      if (id) {
        this.updateCategory({ id })
      } else {
        this.createCategory()
      }
      this.$router.push('/categories/list')
    },
    ...mapActions({
      fetchCategory: 'fetchCategory',
      createCategory: 'createCategory',
      updateCategory: 'updateCategory'
    }),
    ...mapMutations({
      resetForm: 'RESET_CATEGORY',
      getParentCats: 'GET_PARENT_CATEGORIES',
      setPoster: 'SET_POSTER'
    }),
    handleSetCategory(value, name) {
      const payload = {
        key: name,
        value
      }
      this.$store.commit('UPDATE_CATEGORY_FORM', payload)
    }
  }
}
</script>

<style lang="" scoped>

</style>
