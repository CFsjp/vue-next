<template>
  <el-dialog title="提示" :visible.sync="show" width="30%" @close="handleClose">
    <span>这是一段信息</span>
  </el-dialog>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  // watch: {
  //   dialogVisible() {
  //     this.show = this.dialogVisible
  //   }
  // },
  setup(props) {
    const show = computed(() => props.dialogVisible)

    return {
      show
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss"></style>
