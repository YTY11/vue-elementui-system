<template>
  <el-main class="main-app">
    <router-view :key="routePath"></router-view>
  </el-main>
</template>

<script>
export default {
  name:'MainApp',
  props:{
    routePath:{
      type:String,
      default:''
    }
  }
}
</script>

<style lang="scss" scoped>
.main-app{
  padding: 0;
}
</style>