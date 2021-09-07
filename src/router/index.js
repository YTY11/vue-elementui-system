//引入Vue
import Vue from 'vue'
//引入router
import VueRouter from 'vue-router'
//安装router
Vue.use(VueRouter)

//布局
import Layout from '@/layout'
export const createRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'Login',
    hidden: true
  },

  {
    path:'/',
    component: Layout,
    redirect: 'home',
    children:[
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'Home',
      }
    ]

    
  }

]

//创建route
const route = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoutes
})

//导出
export default route


