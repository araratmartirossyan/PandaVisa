const tableColumns = [
  { title: 'Имя пользователя', field: 'displayName', isIcon: false, icon: '' },
  { title: 'Номер телефона', field: 'phoneNumber', isIcon: false, icon: '' },
  { title: 'Дней до окончания визы', field: 'days_before', isIcon: false, icon: '' }
]

const fields = [
  {
    name: 'fullname',
    label: 'Enter Fullname',
    placeholder: 'Enter Fullname',
    onChange: 'handleSetUser',
    value: 'fullname'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    onChange: 'handleSetUser',
    value: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    onChange: 'handleSetUser',
    value: 'password'
  }
]

const tableActions = [
  { tag: 'button', class: 'btn btn-danger', label: 'Удалить', dynamic: false, to: '', emit: 'clickDelete' }
]

const tableFilters = [{
  label: 'User types',
  field: 'role',
  options: [{
    key: 'Administrator',
    value: 10
  }, {
    key: 'User',
    value: 0
  }]
}]

export {
  tableColumns,
  tableActions,
  tableFilters,
  fields
}
