import {createRoutes,addRoutes} from '@/router'


const state = {
  routes:[],
  addRoutes:[]
}

const mutations = {
  SET_ROUTES: (state,routes) =>{
    state.routes = routes
  }
}

const actions = {
  getRoutes({commit}){
    return new Promise((resolve) =>{
      if(this.state.user.token == 'admin'){
        commit("SET_ROUTES",createRoutes)
      }
      else{
        commit("SET_ROUTES",addRoutes)
      }
      resolve("success")
    })
   
  }
}

export default{
  state,
  mutations,
  actions
}

