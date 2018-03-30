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
  }
]

const tableActions = [
  {
    tag: 'link',
    class: 'btn btn-info',
    label: 'Изменить',
    dynamic: false,
    to: '/categories/update',
    emit: ''
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
