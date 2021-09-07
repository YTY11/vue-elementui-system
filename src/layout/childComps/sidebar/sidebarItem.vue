<template>
  <fragment v-if="itemList">
    <el-menu-item index="首页">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="导航">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="选项1">选项1</el-menu-item>
        <el-menu-item index="选项2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="选项3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="选项4">
        <template slot="title">选项4</template>
        <el-menu-item index="选项4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    
  </fragment>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
</style>