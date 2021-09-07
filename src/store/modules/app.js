const state = {
  closeSidebar: false,
  isSidebarShow: true
}

const mutations = {
  CLOSE_SIDEBAR: (state, data) => {
    state.closeSidebar = data
  },
  IS_SIDEBAR_SHOW: (state, data) => {
    state.isSidebarShow = data
  }

}


export default {
  state,
  mutations
}