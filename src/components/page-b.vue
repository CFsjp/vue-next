<template>
  <div>
    <h1>pageB组件</h1>
    <page-a></page-a>
  </div>
</template>

<script>
import PageA from './page-a'
export default {
  components: { PageA }
}
</script>

<style lang="scss" scoped></style>
