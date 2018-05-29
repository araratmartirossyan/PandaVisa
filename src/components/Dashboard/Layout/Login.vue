<template>
  <div class="login">
    <div class="card">
      <div class="header">
        <h4 class="title">Вход для админов</h4>
      </div>
      <div class="content">
        <form>
          <div class="row">
            <div class="col-md-12">
              <fg-input 
                type="email"
                label="Почта"
                name="email"
                placeholder="Почта"
                :value="credentials.email"
                @changeValue="handleUpdateCreds"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <fg-input 
                type="password"
                label="Пароль"
                name="password"
                placeholder="Пароль"
                :value="credentials.password"
                @changeValue="handleUpdateCreds"
              />
            </div>
          </div>
          <p class="text-danger">
            {{error}}
          </p>
          <div class="text-center">
            <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="handleSubmit">
              Войти
            </button>
          </div>
          <div class="clearfix"></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    handleUpdateCreds(value, key) {
      const payload = {
        key,
        value
      }
      this.$store.commit('UPDATE_CREDS', payload)
    },
    ...mapActions({
      handleSubmit: 'login'
    })
  },
  computed: {
    ...mapState({
      credentials: state => state.credentials
    }),
    ...mapGetters({
      error: 'loginError'
    })
  }
}

</script>
<style>
  .login {
    background-color: #f4f3ef;
    position: relative;
    z-index: 2;
    float: right;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login .card .content {
    width: 420px;
  }
</style>
