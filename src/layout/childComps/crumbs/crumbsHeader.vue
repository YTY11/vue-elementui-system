<template>
  <el-header class="crumbs-header">
    <div class="switch-icon" @click="clickSwitch">
      <svg-icon
        v-if="!isCollapse"
        class="switch"
        icon-class="unfold"
      ></svg-icon>
      <svg-icon
        v-else
        transform="rotate(180)"
        class="switch"
        icon-class="unfold"
      ></svg-icon>
    </div>
    <el-breadcrumb
      :class="{ 'crumbs-hidden': isCrumbShow }"
      ref="crumb"
      separator=">"
    >
      <el-breadcrumb-item v-for="(crumb, index) in crumbsList" :key="index">{{
        crumb
      }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="set-msg">
      <div class="set-msg-screen" v-if="userScreen" @click="screen">
        <svg-icon
          v-if="!screenfull"
          class="screen"
          icon-class="screenOn"
        ></svg-icon>
        <svg-icon v-else class="screen" icon-class="screenOff"></svg-icon>
      </div>
      <el-dropdown>
        <div class="user-msg">
          <img src="~@/assets/logo.png" alt="" />
          <span>{{ userName }}</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
          <el-dropdown-item divided command="退出登录" @click.native="userExit"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
   
  </el-header>
</template>

<script>
//全屏组件
import screenfull from "screenfull";

//获取用户名
import { getToken, removeToken } from "@/utils/cookie";
export default {
  name: "CrumbsHeader",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    crumbsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      screenfull: false,
      isCrumbShow: false,
      
    };
  },
  watch: {
    //监听面包屑变化判断是否显示
    crumbsList() {
      this.crumbFunction();
    },
  },
  mounted() {
    this.crumbFunction();
    // 监听窗口变化判断面包屑是否显示
    window.onresize = () => {
      this.crumbFunction();
    };
  },
  computed: {
    userName() {
      return getToken();
    },
    //判断全屏等功能是否显示
    userScreen() {
      return this.$store.state.app.isSidebarShow;
    },
    //面包屑是否可以一行显示，不能则隐藏
  },

  methods: {
    //控制侧边导航收缩
    clickSwitch() {
      this.$emit("clickSwitch", !this.isCollapse);
    },

    //全屏
    screen() {
      // 如果不允许进入全屏，发出不允许提示
      if (!screenfull.isEnabled) {
        this.$message.error("您的浏览器不能全屏");
        return false;
      }
      //全屏on/off
      screenfull.toggle();

      //监听全屏变化
      screenfull.on("change", () => {
        this.screenfull = screenfull.isFullscreen;
      });
    },

    //退出登录
    userExit() {
      removeToken();
      this.$router.push(`/login`);
    },

    //面包屑显示
    crumbFunction() {
      this.$nextTick(() => {
        let crumb = this.$refs.crumb;
        let crumbW = crumb.$el.clientWidth;
        let crumbH = crumb.$el.clientHeight;
        let crumbWChilds = 0;
        let crumbHChilds = 0;
        crumb.$children.forEach((element) => {
          crumbWChilds += element.$el.clientWidth;
          crumbHChilds = element.$el.clientHeight;
        });
        if (
          crumbW < crumbWChilds ||
          crumbHChilds > 14 ||
          crumbH > crumbHChilds
        ) {
          this.isCrumbShow = true;
        } else {
          this.isCrumbShow = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.crumbs-header {
  height: 50px;
  font-size: 12px;
  padding-left: 0;
  display: flex;
  align-items: center;
  box-shadow: 0px -2px 6px 0px rgb(59 59 59 / 70%);
  .switch-icon {
    display: flex;
    padding: 0 20px;
    width: 30px;
    height: 100%;
    .switch {
      align-self: center;
      width: 30px;
      height: 30px;
    }
    &:hover {
      cursor: pointer;
      background: #f6f6f4;
    }
  }
  .set-msg {
    display: flex;
    height: 60px;
    margin-left: auto;
    align-items: center;
    .set-msg-screen {
      height: 100%;
      padding: 0 8px;
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        background: #f6f6f4;
      }
      .screen {
        width: 25px;
        height: 25px;
      }
    }
    .user-msg {
      display: flex;
      height: 60px;
      align-items: center;
      margin-top: auto;
      &:hover {
        cursor: pointer;
        background: #f6f6f4;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      span {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
  .crumbs-hidden {
    height: 0;
    overflow: hidden;
  }
}
</style>