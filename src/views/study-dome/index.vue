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
</style>
