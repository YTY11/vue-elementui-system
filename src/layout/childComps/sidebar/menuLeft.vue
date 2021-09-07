<template>
    <el-scrollbar
      class="menu-item"
      :class="{ 'menu-item-mobile': !isSidebarShow }"
      wrap-class="scrollbar-wrapper"
      style="background-color: rgb(40, 42, 44)"
    >
      <el-menu
        class="my-menu el-menu-vertical-demo"
        mode="vertical"
        text-color="#f4f4f4"
        active-text-color="#F8DA63"
        background-color="#282A2C"
        default-active="首页"
        :collapse="isCollapseChild"
        @select="handleSelect"
      >
        <SidebarItem :itemList="itemList" />
      </el-menu>
    </el-scrollbar>
</template>

<script>
//动态生成导航
import SidebarItem from "./sidebarItem.vue";
export default {
  name: "MenuItem",
  components: {
    SidebarItem,
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
    isSidebarShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemList: [],
      isCollapseChild: false,
    };
  },
  watch: {
    /**
     * nv:新数据
     * ov:旧数据
     * 监听导航栏全局状态
     * **/
    isCollapse(nv, ov) {
      if (!this.isSidebarShow) {//判断是否为小屏
        this.isCollapseChild = false;
      } else {
        this.isCollapseChild = nv;
      }
    },
  },

  mounted() {
    if (!this.isSidebarShow) {//判断是否为小屏
      this.isCollapseChild = false;
    } else {
      this.isCollapseChild = this.isCollapse;
    }
    //获取导航栏数据
    this.itemList = this.$store.state.permission.routes;
  },
  methods: {
    //获取选中的导航栏路径,用于面包屑展示
    handleSelect(index, indexPath) {
      if (!this.isSidebarShow) {//判断是否为小屏
      this.$store.commit("CLOSE_SIDEBAR",!this.isCollapse)
    }
     
      this.$emit('handleSelect',indexPath)
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  height: 100vh;
  box-shadow: 0px 0px 8px 5px rgba($color: #3b3b3b, $alpha: 0.7);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 256px;
  }
  .my-menu {
    border: 0;
  }
}
.menu-item-mobile {
  position: absolute;
  left: 0;
  z-index: 9;
}
</style>