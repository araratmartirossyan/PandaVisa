const tableColumns = [
  { title: 'Username', field: 'fullname', isIcon: false, icon: '' },
  { title: 'Rights', field: 'rights', isIcon: false, icon: '' },
  { title: 'Specialty', field: 'speciality', isIcon: false, icon: '' },
  { title: 'Interests', field: 'sub_speciality', isIcon: false, icon: '' },
  { title: 'Phone Number', field: 'phone_number', isIcon: false, icon: '' },
  { title: 'WeChat ID', field: 'union_id', isIcon: false, icon: '' },
  { title: 'City', field: 'city', isIcon: false, icon: '' },
  { title: 'Number of Posts', field: 'posts_count', isIcon: true, icon: 'ti-write' },
  { title: 'Number of Categories Followed', field: 'followed_categories_count', isIcon: true, icon: 'ti-rss-alt' },
  { title: 'Total Number of Shares', field: 'shares_count', isIcon: true, icon: 'ti-sharethis' },
  { title: 'Favourite Category', field: 'favourite_category', isIcon: true, icon: 'ti-heart' }
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
  { tag: 'button', class: 'btn btn-danger', label: 'Delete', dynamic: false, to: '', emit: 'clickDelete' },
  { tag: 'button', class: 'btn btn-info', label: 'Suspend', dynamic: true, to: '', emit: 'clickSuspend' }
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
