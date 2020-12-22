<template>
  <div>
    <h1>pageA组件</h1>
    <page-b></page-b>
  </div>
</template>

<script>
import PageB from './page-b'
export default {
  components: { PageB }
}
</script>

<style lang="scss" scoped></style>
