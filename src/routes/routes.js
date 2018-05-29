import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import LoginLayout from '../components/Dashboard/Layout/Login.vue'
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'
import DashboardContent from 'src/components/Dashboard/Views/DashboardContent.vue'
import CategoriesList from 'src/components/Categories/Views/CategoriesList.vue'
import CategoriesForm from 'src/components/Categories/Views/CategoriesForm.vue'
import UsersList from 'src/components/Users/Views/UsersList.vue'
import AddUser from 'src/components/Users/Views/AddUser.vue'

import CurrencyControl from 'src/components/CurrencyControl/CurrencyControl.vue'
import Lids from 'src/components/Lids/Views/Lids.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    meta: { mustAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Статистика и основная иформация',
        component: DashboardContent
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginLayout
  },
  {
    path: '/currency',
    component: DashboardLayout,
    redirect: '/currency/data',
    media: { mustAuth: true },
    children: [
      {
        path: 'data',
        name: 'Контроль Валют',
        component: CurrencyControl
      }
    ]
  },
  {
    path: '/categories',
    component: DashboardLayout,
    redirect: '/categories/list',
    media: { mustAuth: true },
    children: [
      {
        path: 'list',
        name: 'Услуги',
        component: CategoriesList
      },
      {
        path: 'add',
        name: 'add',
        component: CategoriesForm
      },
      {
        path: 'update/:id',
        name: 'update',
        component: CategoriesForm
      }
    ]
  },
  {
    path: '/users',
    component: DashboardLayout,
    redirect: '/users/list',
    meta: { mustAuth: true },
    children: [
      {
        path: 'list',
        name: 'Список пользователей',
        component: UsersList
      },
      {
        path: 'add',
        name: 'add User',
        component: AddUser
      }
    ]
  },
  {
    path: '/lids',
    component: DashboardLayout,
    redirect: '/lids/list',
    meta: { mustAuth: true },
    children: [
      {
        path: 'list',
        name: 'Список заявок',
        component: Lids
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    meta: { mustAuth: true },
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routes
