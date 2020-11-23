<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="form"
    >
      <el-form-item v-show="value === 'name'" label="输入框" :prop="value">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item v-show="value === 'age'" label="输入框" :prop="value">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item v-show="value === 'tel'" label="输入框" :prop="value">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
    </el-form>
    <p v-for="(item, index) in testList" :key="index">
      {{ item.icon }}
    </p>
    <el-button @click="changeArr" type="info" size="mini">
      change
    </el-button>
    <p class="demo">{{ arr2 }}</p>
    <el-button @click="changeArr2" type="info" size="mini">
      change
    </el-button>
    <div class="before">
      <h1>Before</h1>
      <p>Animate/transition box-shadow 可以使用box-shadow属性来实现盒子阴影效果，但重绘消耗较多</p>
    </div>
    <hr />
    <div class="after">
      <h1>After</h1>
      <p>通过修改伪元素的透明度来实现同样的效果,没有重绘消耗</p>
    </div>
    <ul class="breadcrumb">
      <li><a href="#">Home</a>
      </li>
      <li><a href="#">Pictures</a>
      </li>
      <li><a href="#">Summer 15</a>
      </li>
      <li>Italy</li>
    </ul>
    <div>
      <h1>Typing Animation</h1>
      <p class="tagline">
        <span class="tagline-skill">
          <span class="tagline-skill_inner">webdesign</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  setup() {
    const { value, options } = useSelect()
    const { ruleForm, rules } = useForm()
    const { testList, changeArr, arr2, changeArr2 } = useArr()

    return {
      value,
      options,
      ruleForm,
      rules,
      testList,
      changeArr,
      arr2,
      changeArr2
    }
  }
}

function useSelect() {
  const value = ref('name')
  const options = [
    {
      value: 'name',
      label: '姓名'
    },
    {
      value: 'age',
      label: '年龄'
    },
    {
      value: 'tel',
      label: '手机号'
    }
  ]

  return { value, options }
}

function useForm() {
  // el-form中，prop对应的 字段名，必须和下面表单中的字段名一致，否则无法校验到
  const ruleForm = reactive({ name: '', age: '', tel: '' })
  const rules = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 3, max: 6, message: '请输入合适长度的姓名', trigger: 'change' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' },
      { type: 'number', message: '年龄必须为数字', trigger: 'blur' }
    ],
    tel: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
      { len: 11, message: '手机号是11位数字', trigger: 'change' },
      { pattern: /1[0-9]{10}/, message: '错误的手机号格式', trigger: 'change' }
    ]
  }

  return { ruleForm, rules }
}

function useArr() {
  const testList = reactive([
    { icon: 'new' },
    { icon: 'del' },
    { icon: 'none' }
  ])
  const arr2 = reactive([1, 3, 5, 7])

  function changeArr() {
    testList.forEach((item) => {
      item.icon = 'none'
    })
    console.log(testList)
  }

  function changeArr2() {
    arr2.forEach((item, index, arr) => {
      arr[index] = 20
    })
    console.log(arr2)
  }

  return { testList, changeArr, arr2, changeArr2 }
}
</script>

<style lang="scss" scoped>
.form {
  width: 217px;
}

.before {
  padding: 1em;
  background-color: #fff;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.before:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}
.after {
  position: relative;
  padding: 1em;
  background-color: #fff;
}
.after:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  opacity: 0;
  will-change: opacity;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.after:hover:before {
  opacity: 1;
}

ul.breadcrumb {
    padding: 8px 16px;
    list-style: none;
    background-color: #eee;
}
ul.breadcrumb li {
    display: inline;
}
ul.breadcrumb li+li:before {
    padding: 8px;
    color: black;
    content: "/\00a0";
}
ul.breadcrumb li a {
    color: green;
}

// .tagline-skill_inner:after {
//     content: "";
//     position: absolute;
//     top: -1px;
//     right: 0;
//     bottom: -2px;
//     left: 0;
//     border-left: 1px solid #fff;
//     background-color: #2a2a28;
//     -webkit-animation: animatetoright 1s steps(10) infinite alternate;
//     animation: animatetoright 1s steps(10) infinite alternate;
// }

.demo {
  // transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
  // transition: all .5s;
  width: 100px;
  height: 100px;
  transition: all 2s;
  background-color: #E6A23C;
  display: table-cell;
  vertical-align: middle;

  &:hover {
    width: 200px;
    background-color: #409EFF;
  }
}
</style>
