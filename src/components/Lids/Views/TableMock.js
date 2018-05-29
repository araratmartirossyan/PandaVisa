const tableColumns = [
  {
    title: 'Заголовок',
    field: 'title',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Создана',
    field: 'created_at',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Номер телефона',
    field: 'phone',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Электронный адрес',
    field: 'email',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Проверено',
    field: 'isVerified',
    isIcon: false,
    icon: 'ti-check'
  }
]

const tableActions = [
  {
    tag: 'button',
    class: 'btn btn-info',
    label: 'Сменить статус',
    dynamic: false,
    to: '',
    emit: 'clickUpdate'
  },
  {
    tag: 'button',
    class: 'btn btn-danger',
    label: 'Удалить',
    dynamic: false,
    to: '',
    emit: 'clickDelete'
  }
]

const types = [
  {
    name: 'anatomy',
    value: 'anatomy'
  },
  {
    name: 'speciality',
    value: 'speciality'
  }
]

const fields = [
  {
    name: 'title',
    label: '',
    placeholder: 'Введите название',
    onChange: 'handleSetCategory',
    value: 'title'
  }
]

export {
  tableColumns,
  tableActions,
  types,
  fields
}
