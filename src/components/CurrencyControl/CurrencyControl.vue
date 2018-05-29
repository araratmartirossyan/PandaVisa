<template>
<div class="col-md-8 col-md-offset-2">
  <div class="card">
    <div class="currency">
      <div class="head">
        <h3>Контроль курса валют</h3>
        <alert :alert="alert" />
      </div>
      <div class="content">
        <fg-input
          type="text"
          v-for="(index, key) in fields"
          :key="key"
          :label="index.label"
          :placeholder="index.placeholder"
          @changeValue="updateForm"
          :name="index.name"
          :value="form[index.name]"
        />
        <button 
          type="submit"
          class="btn btn-info btn-fill btn-wd" 
          @click.prevent="handleUpdateCurrency"
        >
          Обновить
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'
import { fields } from './currency.mock.js'

export default {
  data: () => ({
    fields,
    form: {}
  }),
  mounted() {
    this.handleFetchCurrency()
  },
  watch: {
    currency() {
      this.form = this.currency
    }
  },
  methods: {
    updateForm(value, name) {
      this.handleSetCurrency({
        key: name,
        value
      })
    },
    ...mapMutations([
      'handleSetCurrency'
    ]),
    ...mapActions([
      'handleUpdateCurrency',
      'handleFetchCurrency'
    ])
  },
  computed: {
    ...mapGetters([
      'currency'
    ]),
    ...mapState({
      alert: state => state.alert
    })
  }
}
</script>

<style>
  .head {
    padding: 10px 25px;
  }
</style>
