import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import LoginLayout from '../components/Dashboard/Layout/Login.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'

// Dashboard
import DashboardContent from 'src/components/Dashboard/Views/DashboardContent.vue'

// Categories Pages
import CategoriesList from 'src/components/Categories/Views/CategoriesList.vue'
import CategoriesForm from 'src/components/Categories/Views/CategoriesForm.vue'

// Users list
import UsersList from 'src/components/Users/Views/UsersList.vue'
import AddUser from 'src/components/Users/Views/AddUser.vue'

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
        name: 'list',
        component: UsersList
      },
      {
        path: 'add',
        name: 'add',
        component: AddUser
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

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
