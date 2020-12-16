<template>
  <div>
    <el-button @click="isReverse = !isReverse">倒序</el-button>
    <ul :class="{ ul: isReverse }">
      <li v-for="(item, index) in arr" :key="index">
        index:{{ index }},name:{{ item[0] }},age:{{ item[1] }}
      </li>
    </ul>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :auto-upload="false"
      ref="upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-button @click="submit">submit</el-button>
    <div class="block">
      <!-- <span class="demonstration">默认显示所有Tag</span> -->
      <el-cascader
        :options="options"
        :props="props"
        @change="cascaderChange"
        @blur="blur"
        @expand-change="cascaderExpandChange"
        placeholder="请输入"
        clearable
        :show-all-levels="false"
        collapse-tags
        :filterable="true"
      ></el-cascader>
    </div>
    <el-time-picker
      v-model="value1"
      format="HH:mm"
      :picker-options="{
        selectableRange: '00:00:00 - 23:59:00'
      }"
      placeholder="任意时间点"
    >
    </el-time-picker>
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @visible-change="visibleChange"
      @blur="blur"
    ></el-cascader>
  </div>
</template>

<script>
// import '@/study/源码实现/5、new操作符/new'
// import '@/study/源码实现/4.call、apply、bind实现/test'
// import '@/study/源码实现/6、instanceOf/index'

export default {
  data() {
    return {
      arr: [
        ['张三', 18],
        ['李四', 19],
        ['王五', 20],
        ['赵六', 21]
      ],
      isReverse: false,
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' }
              ]
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
              ]
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
              ]
            }
          ]
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
              ]
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
              ]
            }
          ]
        }
      ],
      value1: new Date(2016, 9, 10, 18, 40),
      value: ''
    }
  },
  methods: {
    submit() {
      this.$refs.upload.submit()
    },
    cascaderChange(data) {
      console.log(data)
    },
    cascaderExpandChange() {},
    blur(e) {
      console.log(e)
    },
    visibleChange(data) {
      console.log(data)
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
