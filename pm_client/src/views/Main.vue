<template>
  <div class="main-wrap">
    <side-bar></side-bar>
    <app-main></app-main>
  </div>
</template>

<script>
import AppMain from '@/views/layout/AppMain/AppMain'
import SideBar from '@/views/layout/SideBar/SideBar'
export default {
  data () {
    return {
    }
  },
  components: {
    AppMain,
    SideBar
  },
  created () {
    this.$store.commit('setOpenedList')
  },
  watch: {
    '$route' (to, from) {
      this.$store.commit('setCurrentPageName', to.name)
    }
  }
}
</script>

<style lang="scss">
</style>
