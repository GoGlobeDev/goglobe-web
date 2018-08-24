<template>
  <div>
    <header-con></header-con>
    <main-con></main-con>
  </div>
</template>
<script>
import { HeaderCon, MainCon } from './components'

export default {
  name: 'home',
  components: {
    HeaderCon,
    MainCon
  }
}
</script>
<style lang="stylus" scoped>
</style>
