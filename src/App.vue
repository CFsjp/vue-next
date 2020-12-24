<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  background-image: url('./assets/imgs/bgc-img.jpeg');
  background-size: 100% 100%;
}
</style>
