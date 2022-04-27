import React from 'react'
import { Redirect } from 'react-router-dom'
const role = parseInt(window.localStorage.getItem('role'))
let firstPath = ''
role === 1 ? (firstPath = '/main/user') : (firstPath = 'main/addActivity')

const Login = React.lazy(() =>
  import(/*webpackPreFetch: true*/ '@/views/login')
)

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/login" element={<Login />} />
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: React.lazy(() => import('@/views/main')),
    routes: [
      {
        path: '/main',
        exact: true,
        render: () => <Redirect to={firstPath} />
      },
      {
        path: '/main/user',
        component: React.lazy(() => import('@/views/user'))
      },
      {
        path: '/main/comment',
        component: React.lazy(() => import('@/views/comment'))
      },
      {
        path: '/main/work',
        component: React.lazy(() => import('@/views/work'))
      },
      {
        path: '/main/addActivity',
        component: React.lazy(() => import('@/views/addActivity'))
      },
      {
        path: '/main/removeActivity',
        component: React.lazy(() => import('@/views/removeActivity'))
      },
      {
        path: '/main/post',
        component: React.lazy(() => import('@/views/post'))
      }
    ]
  }
]

export default routes
