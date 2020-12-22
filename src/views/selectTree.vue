<template>
  <div>
    <el-button @click="isReverse = !isReverse">倒序</el-button>
    <ul :class="{ ul: isReverse }">
      <li v-for="(item, index) in arr" :key="index">
        index:{{ index }},name:{{ item[0] }},age:{{ item[1] }}
      </li>
    </ul>
    <el-upload
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :data="{ params }"
      :before-upload="change"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <!-- <br />
    <page-a />
    <br />
    <page-b /> -->

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">
        切换第二、第三行的选中状态
      </el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="clearRow">清除选择</el-button>
    </div>
  </div>
</template>

<script>
// import '@/study/源码实现/5、new操作符/new'
// import '@/study/源码实现/4.call、apply、bind实现/test'
// import '@/study/源码实现/6、instanceOf/index'
// import PageB from '@/components/page-b'
// import PageA from '@/components/page-a'

export default {
  // components: { PageA, PageB },
  data() {
    return {
      arr: [
        ['张三', 18],
        ['李四', 19],
        ['王五', 20],
        ['赵六', 21]
      ],
      isReverse: false,
      params: {},
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    change() {
      this.params = { age: 18, name: '王文哲' }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clearRow() {
      this.multipleSelection = []
    }
  }
}
</script>

<style lang="scss" scoped>
.ul {
  display: flex;
  flex-direction: column-reverse;
}
</style>
