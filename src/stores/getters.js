/* es-lint disable */
export const user = state => state.user

export const loadingUser = state => state.loadingUser

export const isAuth = state => {
  const uid = localStorage.getItem('token')
  return uid ? state.login : false
}

export const loginError = state => state.loginError

export const loginModel = (state) => (!state.login ? state.loginModel : {})

export const signupModel = (state) => (!state.login ? state.signupModel : {})

export const isAdmin = state => (state.user.role === 999)

export const isUser = state => (state.user.role === 10)

export const isGuest = state => (state.user.role === 0)
