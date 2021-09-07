import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入访问权限
import './permission'
// 引入基本样式 normalize
import 'normalize.css/normalize.css'
//解决el-menu 导航栏收起文字不消失问题
import Fragment from 'vue-fragment'

// 引入svg
import './icons/index'

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入Cookies
import VueCookies from 'vue-cookies'

//安装Cookies
Vue.use(VueCookies)
//安装elementUi
Vue.use(ElementUI)
//安装Fragment
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
