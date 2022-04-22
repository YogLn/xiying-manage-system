import React from 'react'
import { Redirect } from 'react-router-dom'

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
        render: () => <Redirect to="/main/user" />
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
      }
    ]
  }
]

export default routes
