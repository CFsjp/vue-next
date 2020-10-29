import { reactive, ref, watch } from '@vue/composition-api'

export function useVuex(root) {
  const count = ref(root.$store.state.count)

  watch(
    () => root.$store.state.count,
    (newVal) => {
      count.value = newVal
    }
  )

  function changeCount(num) {
    root.$store.dispatch('asyncCount', num)
  }

  function downExcel() {
    window.open('./1.xlsx')
  }
  return { count, changeCount, downExcel }
}

export function useQuerySearch() {
  const restaurants = reactive([
    { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
    { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
    { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
    { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
    { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
    { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
    { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
    { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' }
  ])
  const state = ref('')

  function querySearch(queryString, cb) {
    const results = queryString
      ? restaurants.filter(createFilter(queryString))
      : restaurants
    // 调用 callback 返回建议列表的数据
    cb(results)
  }
  function createFilter(queryString) {
    return (data) => {
      return data.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }

  function handleSelect(item) {
    console.log(item)
  }

  function handleIconClick() {
    console.log(1111111111111)
  }

  return { restaurants, state, querySearch, handleSelect, handleIconClick }
}

export function useCascader() {
  const cascadeProps = { multiple: true, checkStrictly: true }
  const options = [
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
  ]

  return { cascadeProps, options }
}
