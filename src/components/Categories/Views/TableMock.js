const tableColumns = [
  {
    title: 'Title',
    field: 'title',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Icon',
    field: 'icon',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Parent',
    field: 'parentId',
    isIcon: false,
    icon: ''
  },
  {
    title: 'Created at',
    field: 'created_at',
    isIcon: false,
    icon: ''
  }
]

const tableActions = [
  {
    tag: 'link',
    class: 'btn btn-info',
    label: 'Edit',
    dynamic: false,
    to: '/categories/update',
    emit: ''
  },
  {
    tag: 'button',
    class: 'btn btn-danger',
    label: 'Delete',
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
    placeholder: 'Enter name',
    onChange: 'handleSetCategory',
    value: 'title'
  },
  {
    name: 'titlecn',
    label: 'Name in chinese',
    placeholder: 'Enter name in chinese',
    onChange: 'handleSetCategory',
    value: 'titlecn'
  },
  {
    name: 'icon',
    label: 'Category Icon',
    placeholder: 'Enter icon name',
    onChange: 'handleSetCategory',
    value: 'icon'
  }
]

export {
  tableColumns,
  tableActions,
  types,
  fields
}
