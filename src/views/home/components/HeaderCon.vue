<template>
    <div class="header">
      <logo></logo>
      <navbar></navbar>
    </div>
</template>

<script>
import Logo from '@/components/logo'
import Navbar from '@/components/Navbar'

export default {
  name: 'header',
  components: {
    Logo,
    Navbar
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
.header
  position: fixed
  top: 0
  left: 0
  right: 0
  box-shadow: 0px 3px 7px 0 rgba(68, 68, 68, .3)
  background-color: rgba(#f8f8f8, 0.9)
  z-index: 9
  padding: 0 50px
  height: 60px
  line-height: 60px
</style>
