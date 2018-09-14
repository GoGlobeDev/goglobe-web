<template>
  <el-menu :default-active="activeIndex" class="navbar fr" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><a href="#home">{{$t('header.home')}}</a></el-menu-item>
      <el-menu-item index="2"><a href="#intro">{{$t('header.intro')}}</a></el-menu-item>
      <el-menu-item index="3"><a href="#download">{{$t('header.whitePaper')}}</a></el-menu-item>
      <el-menu-item index="4"><a href="#chainData">{{$t('header.chainData')}}</a></el-menu-item>
      <el-menu-item index="5"><a href="">{{$t('header.downloadAPP')}}</a></el-menu-item>
      <el-menu-item index="6"><a href="#team">{{$t('header.team')}}</a></el-menu-item>
      <el-menu-item index="7"><a href="#contact">{{$t('header.contact')}}</a></el-menu-item>
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
  </el-menu>
</template>

<script>
// import LangSelect from '@/components/LangSelect'
export default {
  components: {
    // LangSelect
  },
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar
  border: none
  // .el-menu-item
  //   padding: 0 10px
</style>
