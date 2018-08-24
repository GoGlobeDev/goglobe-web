<template>
  <el-menu :default-active="activeIndex" class="navbar fr" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><a href="#home">{{$t('header.home')}}</a></el-menu-item>
      <el-menu-item index="2">{{$t('header.intro')}}</el-menu-item>
      <el-menu-item index="3">{{$t('header.whitePaper')}}</el-menu-item>
      <el-menu-item index="4"><a href="">{{$t('header.team')}}</a></el-menu-item>
      <el-menu-item index="4"><a href="">{{$t('header.contact')}}</a></el-menu-item>
      <lang-select class="international right-menu-item"></lang-select>
  </el-menu>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    LangSelect
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
  width: 60%
</style>
