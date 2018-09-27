<template>
  <el-menu :default-active="activeIndex" class="navbar fr" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><a href="/#home">{{$t('header.home')}}</a></el-menu-item>
      <el-menu-item index="2"><a href="/#intro">{{$t('header.intro')}}</a></el-menu-item>
      <el-menu-item index="3"><a href="/#download">{{$t('header.whitePaper')}}</a></el-menu-item>
      <el-menu-item index="4"><a href="/#chainData">{{$t('header.chainData')}}</a></el-menu-item>
      <el-menu-item index="5"><a href="">{{$t('header.downloadAPP')}}</a></el-menu-item>
      <el-menu-item index="6"><a href="/#team">{{$t('header.team')}}</a></el-menu-item>
      <el-menu-item index="7"><a href="/#contact">{{$t('header.contact')}}</a></el-menu-item>
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
  </el-menu>
</template>

<script>
// import LangSelect from '@/components/LangSelect'
export default {
  components: {
    // LangSelect
  },
  created () {
    this.loadIndex()
  },
  data () {
    return {
      activeIndex: '1',
      indexMap: [
        {href: '#home', index: '1'},
        {href: '#intro', index: '2'},
        {href: '#download', index: '3'},
        {href: '#chainData', index: '4'},
        // {href: '#home', index: '5'},
        {href: '#team', index: '6'},
        {href: '#contact', index: '7'}
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    loadIndex () {
      const hash = window.location.hash
      if (hash) {
        const activeItem = this.indexMap.filter((item) => {
          return item.href === hash
        })
        this.activeIndex = activeItem[0].index
      } else {
        this.activeIndex = '1'
      }
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
