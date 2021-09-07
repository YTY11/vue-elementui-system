import { getToken,setToken} from "@/utils/cookie";

const state = {
  token: getToken()
}

const mutations = {

  //设置token
  'SET_TOKEN':(state,token)=>{
    state.token = token
  },
 
}

const actions = {
  login({commit},userInfo){
    const {userName} = userInfo

    return new Promise((resolve) =>{
      commit('SET_TOKEN',userName)
      setToken(userName)
      resolve('/')
    })
  },
  
}

export default{
  state,
  mutations,
  actions
}