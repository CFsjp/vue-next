<template>
  <div>
    <!-- <select-tree
      :options="tree"
      :value="treeValue"
      :props="defaultProps"
      :clearable="true"
      :is-level="false"
      :is-check="true"
      @getValue="dictSelect($event)"
      @clear="clear"
      ref="selectTree"
    /> -->
    <el-select v-model="mineStatus" placeholder="请选择" multiple collapse-tags>
      <el-option style="height: auto">
        <!-- option展开高度太小，把height设置为auto就好啦 -->
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        ></el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import '@/study/源码实现/5、new操作符/new'
import '@/study/源码实现/4.call、apply、bind实现/test'

export default {
  data() {
    return {
      mineStatus: '',
      mineStatusValue: [],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1'
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    const arr = []
    for (let i = 0; i < 1000; i++) {
      const temp = {
        id: i + 5,
        label: `二级 2-${i + 1}`
      }
      arr.push(temp)
    }
    this.data[1].children = arr
  },
  methods: {
    // select框值改变时候触发的事件
    selectChange(e) {
      const arrNew = []
      const dataLength = this.mineStatusValue.length
      const eleng = e.length
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].label) {
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew) // 设置勾选的值
    },
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes(true, true) // 这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      const arrLabel = []
      const arr = []
      res.forEach(item => {
        arrLabel.push(item.label)
        arr.push(item)
      })
      this.mineStatusValue = arr
      this.mineStatus = arrLabel
      console.log('arr:' + JSON.stringify(arr))
      console.log('arrLabel:' + arrLabel)
    }
  }
}
</script>

<style></style>
