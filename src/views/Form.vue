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
      label-width="100px"
    >
      <el-form-item label="输入框" :prop="value">
        <el-input v-model="ruleForm.value"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  setup() {
    const { value, options } = useSelect()
    const { ruleForm, rules } = useForm()

    return { value, options, ruleForm, rules }
  }
}

function useSelect() {
  const value = ref('')
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
  const ruleForm = reactive({ value: '' })
  const rules = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 3, max: 15, message: '请输入合适长度的姓名', trigger: 'change' }
    ],
    age: [
      { required: true, message: '请输入年龄', trigger: 'blur' },
      { type: 'number', message: '年龄必须为数字', trigger: 'change' }
    ],
    tel: [
      { required: true, message: '请输入电话号码', trigger: 'blur' },
      { len: 11, message: '手机号是11位数字' },
      { pattern: /1[0-9]{10}/, message: '错误的手机号格式' }
    ]
  }

  return { ruleForm, rules }
}
</script>

<style></style>
