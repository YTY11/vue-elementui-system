<template>
 
    <el-container style="height: 100vh">
      <!-- 左侧导航 -->
      <MenuLeft
        ref="menuLeft"
        class="menu-left"
        @handleSelect="handleSelect"
        :isSidebarShow="isSidebarShow"
        :isCollapse="closeSidebar"
      ></MenuLeft>
      <el-container class="mainConent">
        <!-- header -->
        <CrumbsHeader
          :crumbsList="crumbsList"
          :isCollapse="closeSidebar"
          @clickSwitch="clickSwitch"
        />
        <el-tabs
          style="padding: 0 20px"
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>

        <MainApp :routePath="routePath"></MainApp>
        <!-- <el-table>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table> -->
      </el-container>

      <div @click="zheZhao" class="zhe-zhao" v-if="showZheZhao"></div>
    </el-container>
  
</template>

<script>
//左侧导航栏
import MenuLeft from "./childComps/sidebar/menuLeft.vue";
//header
import CrumbsHeader from "./childComps/crumbs/crumbsHeader.vue";
//mainApp
import MainApp from "@/layout/childComps/mainApp";

//混入
import resizeHandle from "./mixin/resizeHandle";
import { mapState } from "vuex";

//动画
import "animate.css";
export default {
  name: "Layout",
  components: {
    MenuLeft,
    CrumbsHeader,
    MainApp,
  },

  data() {
    return {
      isCollapse: false,
      show: false,
      crumbsList: ["首页"],
      routePath: "home",

      editableTabsValue: "name2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "Tab 2",
          name: "name2",
          content: "Tab 2 content",
        },
      ],
      tabIndex: 2,
    };
  },
  mixins: [resizeHandle],
  computed: {
    ...mapState({
      closeSidebar: (state) => state.app.closeSidebar,
      isSidebarShow: (state) => state.app.isSidebarShow,
    }),
    showZheZhao() {
      return !this.isSidebarShow && !this.closeSidebar;
    },
  },

  mounted() {
    //页面元素挂载后是否小屏
    if (!this.isSidebarShow) {
      //收起导航栏
      this.$refs.menuLeft.$el.style.transform = "translateX(-256px)";
    }
  },
  watch: {
    /**
     * nv:新数据
     * ov:旧数据
     * 监听窗口大小判断是否改变导航栏熟悉（添加定位，便于小屏显示）
     * **/
    isSidebarShow(nv, ov) {
      if (!nv) {
        //小屏
        if (this.$store.state.app.closeSidebar) {
          //导航栏收起
          this.$refs.menuLeft.$el.style.transform = "translateX(-256px)";
        } else {
          //导航栏展开
          this.$refs.menuLeft.$el.style.transform = "translateX(0)";
        }
      } else {
        //大屏
        this.$refs.menuLeft.$el.style.transform = "translateX(0)";
      }
    },

    /**
     * nv:新数据
     * ov:旧数据
     * 监听遮罩层是否显示来判断导航栏是否收起
     * **/
    showZheZhao(nv, ov) {
      if (!nv) {
        //没有遮罩层，收起导航栏，添加过渡效果
        this.$refs.menuLeft.$el.style.transform = "translateX(-256px)";
        this.$refs.menuLeft.$el.style.transition = "all 0.3s";
      }
    },
  },
  methods: {
    /**
     * data:导航栏开关（true,false）
     * 通过点击开关控制导航栏收缩
     * **/
    clickSwitch(data) {
      if (!this.isSidebarShow) {
        //小屏下展开导航并添加过渡效果
        this.$refs.menuLeft.$el.style.transform = "translateX(0)";
        this.$refs.menuLeft.$el.style.transition = "all 0.3s";
      }
      this.$store.commit("CLOSE_SIDEBAR", data); //改变开关全局状态
      return data;
    },

    //遮罩层点击事件，收起导航栏
    zheZhao() {
      this.$store.commit("CLOSE_SIDEBAR", true); //改变开关全局状态
      this.$refs.menuLeft.$el.style.transform = "translateX(-256px)";
      this.$refs.menuLeft.$el.style.transition = "all 0.3s";
    },

    //面包屑数据
    handleSelect(lists) {
      this.crumbsList = lists;
    },

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>

<style lang="scss" scoped>
.mainConent {
  flex-direction: column;
  overflow: auto;
}
.zhe-zhao {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(30, 30, 30, 0.3);
  height: 100%;
  width: 100%;
  z-index: 2;
}
</style>