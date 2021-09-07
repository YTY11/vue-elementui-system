import route from './router'
import { getToken } from '@/utils/cookie.js'
import store from './store'


// 判断是否需要登录
route.beforeEach((to, from, next) => {
  if (getToken()) {//已经登录
    
    if(store.state.user.token == 'admin'){
     store.dispatch('getRoutes')
    }
    if (to.path === '/login') {//如果访问的是登录页面进入首页
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    }
    else {
      next('/login')
    }

  }

})