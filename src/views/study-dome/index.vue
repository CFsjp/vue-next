<template>
  <div class="dome-wrap">
    <el-button type="primary" @click="goback" round>
      返回上一页
    </el-button>
    <br />
    <el-input
      class="w500px"
      v-model.trim="input"
      v-input-filter:number
      placeholder="请输入内容"
      clearable
    >
      <template slot="prepend">输入正数、负数和小数的输入框:</template>
    </el-input>
    <div>{{ count }}</div>
    <el-button type="primary" @click="request" :loading="loading" round>
      请求点击
    </el-button>
    <br />
    <div class="Home">
      <h5>
        模糊搜索的高亮显示
      </h5>
      <el-input
        v-model="keyWords"
        class="w500px"
        type="text"
        placeholder="请输入关键词"
        @input="handleQuery"
      />
      <ul>
        <li v-for="(item, index) in results" :key="index" v-html="item"></li>
      </ul>
    </div>
    <br />
    <div class="block">
      <div>
        <el-button @click="chooseMsg = initChooseMsg">
          给cascader面板设置初始值
        </el-button>
        <h5 class="demonstration">搜索和三级联动功能</h5>
        <el-cascader
          ref="demoCascader"
          v-model="cascaderArr"
          :options="options"
          :show-all-levels="false"
          :props="{ multiple: true, checkStrictly: true }"
          @change="cascaderChange"
          @visible-change="visibleChange"
          filterable
          collapse-tags
          clearable
        ></el-cascader>
      </div>
      <ul>
        <li
          @click="delectChooseLi(index)"
          v-for="(item, index) in chooseMsg"
          :key="item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="bubbly">气泡</div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/app.ts'
// import '@/study/源码实现/2.防抖节流/index.js'

export default {
  name: 'StudyDome',
  data() {
    return {
      input: null,
      count: 0,
      loading: false,
      keyWords: '上海',
      results: [],
      timer: null,
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      cascaderArr: null,
      initChooseMsg: [
        {
          value: 'fankui',
          label: '反馈',
          path: ['zhinan', 'shejiyuanze', 'fankui']
        },
        {
          value: 'zujian',
          label: '一致',
          path: ['zhinan', 'shejiyuanze', 'yizhi']
        }
      ],
      chooseMsg: null
    }
  },
  mounted() {
    // window.onscroll = debounce(this.getMouseXY, 1000)
    // const list = [
    //   { id: 1, name: '部门A', parentId: 0 },
    //   { id: 2, name: '部门B', parentId: 0 },
    //   { id: 3, name: '部门C', parentId: 1 },
    //   { id: 4, name: '部门D', parentId: 1 },
    //   { id: 5, name: '部门E', parentId: 2 },
    //   { id: 6, name: '部门F', parentId: 3 },
    //   { id: 7, name: '部门G', parentId: 2 },
    //   { id: 8, name: '部门H', parentId: 4 }
    // ]

    // function convert(list) {
    //   const result = []
    //   const map = {}
    //   list.forEach(item => {
    //     if (item.parentId === 0) {
    //       result.push(item)
    //     }
    //     map[item.id] = item
    //   })

    //   list.forEach(item => {
    //     if (item.parentId !== 0) {
    //       const parent = map[item.parentId]
    //       parent.children = parent.children || []
    //       parent.children.push(item)
    //     }
    //   })
    //   console.log(result)
    //   return result
    // }
    // convert(list)

    function FindContinuousSequence(sum) {
      const result = []
      const child = [1, 2]
      let big = 2
      let small = 1
      let currentSum = 3
      while (big < sum) {
        while (currentSum < sum && big < sum) {
          child.push(++big)
          currentSum += big
        }
        while (currentSum > sum && small < big) {
          child.shift()
          currentSum -= small++
        }
        if (currentSum === sum && child.length > 1) {
          result.push(child.slice())
          child.push(++big)
          currentSum += big
        }
      }
      return result
    }

    console.log(FindContinuousSequence(15))
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    async request() {
      this.loading = true
      await getUserInfo()
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
    },
    cascaderChange() {
      this.chooseMsg = this.$refs.demoCascader.getCheckedNodes()
    },
    delectChooseLi(index) {
      this.cascaderArr = this.cascaderArr.filter((item, i) => i !== index)
      this.chooseMsg.splice(index, 1)
    },
    visibleChange(show) {
      if (show && this.chooseMsg.length > 0) {
        this.cascaderArr = this.chooseMsg.map(item => {
          return item.path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dome-wrap {
  padding: 1rem;
}
.w500px {
  width: 500px;
}
.block {
  display: flex;
}
/deep/.search-text {
  color: #409eff;
}

.box1 {
  /* 内部大小 */
  width: 0px;
  height: 0px;
  /* 边框大小 只设置三条边*/
  border-top: #4285f4 solid;
  border-right: transparent solid;
  border-left: transparent solid;
  border-width: 85px;
  /* 其他设置 可有可无*/
  margin: 50px;
}

.box2 {
  /* 内部大小 */
  width: 0px;
  height: 0px;
  /* 边框大小 只设置两条边*/
  border-top: #4285f4 solid;
  border-right: transparent solid;
  border-width: 85px;
  /* 其他设置 */
  margin: 50px;
}

.box3 {
  /* 内部大小 */
  width: 0px;
  height: 0px;
  /* 边框大小 */
  border-top: #4285f4 170px solid;
  border-right: transparent 85px solid;
  border-left: transparent 85px solid;

  /* 其他设置 */
  margin: 50px;
}

.bubbly {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00ccbb;
  border-radius: 8px;
  width: 200px;
  padding: 40px 10px;
  text-align: center;
  color: white;
  font-size: 20px;
}

.bubbly:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  border: 34px solid transparent;
  border-top-color: #00ccbb;
  border-bottom: 0;
  border-left: 0;
  margin: 0 0 -34px -17px;
}
</style>
