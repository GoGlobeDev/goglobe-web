<template>
  <div class="logo-box fl">
      <img src="@/assets/logo.png" class="logo fl">
      <img v-if="language == 'en'" className="logo3" src="@/assets/logo1.png" class="logo1 fl">
      <div v-else class="logo1 logo-text fl">自游链：世界旅游新生态</div>
  </div>
</template>
<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'zh'
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  }
}
</script>
<style lang="stylus" scoped>
.logo-box
  width: 30%
  .logo
    width: 40px
    height: 40px
  .logo1
    width: calc(100% - 50px)
  .logo-text
    font-size: 20px
    margin-left: 5px
    letter-spacing 0.5px
    line-height 1.6
    font-weight normal
</style>
