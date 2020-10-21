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
    <p>{{ arr2 }}</p>
    <el-button @click="changeArr2" type="info" size="mini">
      change
    </el-button>
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
</style>
