<template>
  <div class="dome-wrap">
    <el-button type="primary" @click="goback" round>
      返回上一页
    </el-button>
    <br />
    <el-input
      class="w500px"
      placeholder="请输入内容"
      v-model="input"
      oninput="value=value.replace(/[^\d]/g,'')"
    >
      <template slot="prepend">只能输入纯数字的输入框:</template>
    </el-input>
    <div>{{ count }}</div>
    <el-button type="primary" @click="request" :loading="loading" round>
      请求点击
    </el-button>
    <div class="Home">
      <el-input
        v-model="keyWords"
        class="w500px"
        type="text"
        placeholder="请输入关键词"
        @input="handleQuery"
      >
      </el-input>
      <ul>
        <li v-for="(item, index) in results" :key="index" v-html="item"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/app.ts'
export default {
  name: 'StudyDome',
  data() {
    return {
      input: null,
      count: 0,
      loading: false,
      keyWords: '',
      results: [],
      timer: null
    }
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    async request() {
      this.loading = true
      const res = await getUserInfo()
      console.log(res)
      setTimeout(() => {
        this.count++
        this.loading = false
      }, 1000)
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    handleQuery(keyWords) {
      this.clearTimer()
      console.log(keyWords)
      this.timer = setTimeout(() => {
        const arr = [
          '上海野生动物园',
          '上饶野生动物园',
          '北京巷子',
          '上海中心',
          '上海黄埔江',
          '迪士尼上海',
          '陆家嘴上海中心'
        ]
        this.changeColor(arr)
      }, 2000)
    },
    changeColor(resultsList) {
      resultsList.forEach((item, index, arr) => {
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          const replaceReg = new RegExp(this.keyWords, 'g')
          // 高亮替换v-html值
          const replaceString =
            '<span class="search-text">' + this.keyWords + '</span>'
          arr[index] = item.replace(replaceReg, replaceString)
        }
      })
      this.results = []
      this.results = resultsList
    }
  }
}
</script>

<style lang="scss" scoped>
.w500px {
  width: 500px;
}
/deep/.search-text {
  color: #409eff;
}
</style>
