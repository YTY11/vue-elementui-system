import VueCookies from 'vue-cookies'
const TokenKey = 'TokenKey' 

//获取token
export function getToken(){
  return VueCookies.get(TokenKey)
}

//设置token
export function setToken(token){
  return VueCookies.set(TokenKey,token,{expires:1})
}

//移除token
export function removeToken(){
  return VueCookies.remove(TokenKey)
}