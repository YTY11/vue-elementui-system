const WIDTH = 992
const { body } = document

export default{
  watch: {
    $route(route) {
      console.log(this.device);
    }
  },
  beforeMount() {
    //监听窗口大小变化
    window.addEventListener('resize',this.resizeHandler)
    if(this.isMobile()){
      this.$store.commit('IS_SIDEBAR_SHOW',false)
    }
    this.$store.commit('CLOSE_SIDEBAR',this.isMobile())
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.resizeHandler)
  },
  methods: {
    //判断窗口大小是否小于 922
    isMobile(){
      const rect = body.getBoundingClientRect().width
      return rect < WIDTH
    },
    //根据窗口大小变化，改变导航栏的全局状态
    resizeHandler(){
      this.$store.commit('IS_SIDEBAR_SHOW',!this.isMobile())
      this.$store.commit('CLOSE_SIDEBAR',this.isMobile())
      if(this.isMobile()){
        this.$store.commit('CLOSE_SIDEBAR',this.isMobile())
      }
    }
  },
}
