<template>
  <div class="select-tree">
    <!-- :multiple="isCheck" -->
    <!-- collapse-tags -->
    <el-select
      v-if="!isCheck"
      v-model="valueTitle"
      :clearable="clearable"
      @clear="clearHandle"
      @visible-change="visibleChange"
      filterable
      :placeholder="'请选择' + `${labelName}`"
      :disabled="disabled"
      :filter-method="search"
      style="width:100%"
      ref="selectInput"
      @focus="handleTreeList"
    >
      <el-option
        :value="valueTitle"
        :label="valueTitle"
        v-loading="lazyLoad"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, .6)"
      >
        <!-- <el-input v-model="filterText"></el-input> -->
        <el-tree
          accordion
          ref="selectTreeCon"
          :data="options"
          :props="props"
          :node-key="props.value"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKey"
          @node-click="handleNodeClick"
        >
        </el-tree>
        <!-- :check-strictly="true" 父子没有关联 :node-key="props.value" -->
      </el-option>
    </el-select>
    <el-select
      v-if="isCheck"
      v-model="valueTitle"
      clearable
      @clear="clearHandle"
      filterable
      :disabled="disabled"
      :filter-method="search"
      @visible-change="visibleChange"
      :placeholder="'请选择' + `${labelName}`"
      style="width:100%"
      ref="selectInput"
      @focus="handleTreeList"
    >
      <el-option :value="valueId" :label="valueTitle">
        <el-tree
          accordion
          ref="selectTreeCon"
          :data="options"
          :props="props"
          :show-checkbox="true"
          :node-key="props.value"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @check="handleCheck"
          @check-change="checkChange"
        >
        </el-tree>
        <!-- :check-strictly="true" 父子没有关联 :node-key="props.value" -->
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ElTreeSelect',
  // props: ['options', 'props', 'value'],
  props: {
    options: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return []
      }
    },
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'title', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    labelName: {
      // 提示文本
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    isLevel: {
      // 是否选择最后一级
      type: Boolean,
      default: true
    },
    isFather: {
      // 是否最父节点
      type: Boolean,
      default: false
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      default: () => {
        return false
      }
    },
    isCheck: {
      // 下拉树显示勾选框,默认false (或者是默认为true,点节点只能选一个,点复选框则可以选多个)
      type: Boolean,
      default: false
    },
    lazyLoad: {
      // 下拉树loading效果
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: '',
      defaultExpandedKey: [],
      filterText: '',
      arr: [],
      specTitle: '', // 为空表示默认值是拿主表，不取卡片表
      nodeNameArr: [], // 将节点名称存到数组中，用来判断我选中的是哪一个
      setDef: false, // 区分是设置默认值触发checkChange，还是勾选触发
      fstDef: false, // 区分是否为设置默认值
      currId: '' // 当前组织机构id
    }
  },
  watch: {
    filterText(val) {
      this.$refs.selectTreeCon.filter(val)
    },
    value(val, oldVal) {
      if (val !== oldVal) {
        this.valueId = val
      }
    },
    options(val) {
      if (val.length > 0) {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    visibleChange(val) {
      if (val) {
        this.filterText = null
      }
    },
    // 设置值
    setValue(val) {
      // 设置默认选中
      if (val) {
        if (Object.prototype.toString.call(val) === '[object Array]') {
          // 传数组
          // let titleStr = ''
          // val.forEach(item => { // 只能从这个位置去拿到默认设置的数据，在监听check方法拿到的是总的数据
          //   // console.log('data', this.$refs.selectTreeCon.getNode(item))
          //   this.arr.push(this.$refs.selectTreeCon.getNode(item).data.id)
          //   titleStr += this.$refs.selectTreeCon.getNode(item).data.name + ', '
          // })
          // //  var v = new Set(this.arr) // 数组去重
          // // this.valueId = JSON.parse(JSON.stringify([...v]))
          // this.valueTitle = titleStr

          this.$refs.selectTreeCon.setCheckedKeys(val)
          // if (this.isSec === 2) {}
          // 解决有时候执行setValue方法后，checkChange方法有时没有被执行的bug。不管有没有走下面的方法都调用去执行这个方法
          this.checkChange()
        } else {
          // 传字符串
          this.$refs.selectTreeCon.setCurrentKey(val)
          this.valueTitle = this.$refs.selectTreeCon.getNode(val).data[
            this.props.label
          ] // 初始化显示
          this.defaultExpandedKey = [val] // 设置默认展开
        }
        // this.$refs.selectTreeCon.setCurrentKey(val)
        // this.valueTitle = this.$refs.selectTreeCon.getNode(val).data[
        //   this.props.label
        // ] // 初始化显示
        // this.defaultExpandedKey = [val] // 设置默认展开
        // this.valueTitle = val
      } else {
        this.valueTitle = ''
      }
    },
    // 设置默认值
    setTreeTitle(val) {
      this.setDef = true // 设置默认值时开启
      this.fstDef = true // 是设置默认值则打开状态
      this.currId = val
      const arr = []
      arr.push(val)
      this.$refs.selectTreeCon.setCheckedKeys(arr)
      // 解决有时候执行setValue方法后，checkChange方法有时没有被执行的bug。不管有没有走下面的方法都调用去执行这个方法
      this.checkChange()
    },
    // 初始化值
    init() {
      if (this.valueId) {
        // this.valueTitle = (this.$refs.selectTreeCon.getNode(this.valueId) || { data: {}}).data[
        //   this.props.label
        // ] // 初始化显示
        if (this.isCheck) {
          this.$refs.selectTreeCon.setCurrentKey(this.valueId) // 设置默认选中
        }
        // this.defaultExpandedKey = [this.valueId] // 设置默认展开
      } else {
        this.valueTitle = ''
      }
    },
    // 筛选树
    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        return data[this.props.label].indexOf(value) !== -1
      }
    },
    // 切换选项
    handleNodeClick(node) {
      if (this.isLevel) {
        if (
          !node[this.props.children] ||
          node[this.props.children].length === 0
        ) {
          this.valueTitle = node[this.props.label]
          this.valueId = node[this.props.value]
          this.$emit('getValue', node)
          this.$refs.selectInput.blur()
        }
      } else if (this.isFather) {
        if (node.fatherId !== '0') {
          this.valueTitle = node[this.props.label]
          this.valueId = node[this.props.value]
          this.$emit('getValue', node)
          this.$refs.selectInput.blur()
        }
      } else {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.$emit('getValue', node)
        this.$refs.selectInput.blur()
      }
    },
    // 筛选树
    search(val) {
      this.filterText = val || null
    },
    // 给下拉树输入框赋值
    setInputVal(val) {
      this.valueTitle = val
    },
    // 输入值模糊匹配下拉树的选项
    filterTreeVal(val) {
      this.$refs.selectTreeCon.filter(val)
    },
    // 清除选中
    clearHandle() {
      this.search()
      this.$emit('clear')
      // this.$refs.selectTreeCon.setCurrentKey(null) // 设置默认选中
      if (this.isCheck) {
        this.$refs.selectTreeCon.setCheckedKeys([]) // 如果有勾选框，则清理掉被勾选中的数据
        this.valueId = [] // 清空被选中的值
        this.$emit('getValue', '')
      } else {
        this.valueId = null
        this.$emit('getValue', {})
      }
      this.valueTitle = ''
      this.arr = []
      // 默认列
      this.nodeNameArr = []
      // this.defaultExpandedKey = []
    },
    // 在check方法被触发时，才修改（关闭）状态
    handleCheck() {
      this.setDef = false
    },
    // eslint-disable-next-line no-unused-vars
    checkChange(node, checked, indeterminate) {
      // console.log('是否显示勾选框----------', node, checked, indeterminate)
      // console.log(this.isCheck)
      // console.log('当前节点----------------')
      // console.log(node)
      // console.log('当前节点的勾选状态')
      // console.log(currentBol)
      // if (this.$refs.selectTreeCon.getCheckedNodes().length>0) {}
      // if (this.arr.length === 0) { // 当点选和勾选切换时清空内容
      //   this.valueTitle = ''
      // }
      // if (this.$refs.selectTreeCon.getCheckedNodes(true).length === 0) {
      if (node) {
        // 有当前节点才执行
        this.getCurrNodeName(node, checked)
      }
      this.valueTitle = ''
      this.arr = []
      // }
      // 当前节点的选中状态是false时,关闭开关
      if (!checked && this.fstDef !== true) {
        // this.fstDef !== true不是设置默认值
        this.setDef = false
      }
      // 通过开关区分是设置默认值/重置，还是勾选
      if (this.setDef) {
        // 勾选时，只需要拿当前单位名称和id
        this.$refs.selectTreeCon.getCheckedNodes().forEach(item => {
          if (item.id === this.currId) {
            this.valueTitle = item.name
            this.arr.push(item.id)
            this.fstDef = false // 设置完默认值后关闭状态
          }
        })
      } else {
        // 勾选时需要拼接名称和Id
        this.$refs.selectTreeCon.getCheckedNodes(true).forEach(item => {
          this.getChildrenId(item)
        })
        // 去掉结尾的逗号
        this.valueTitle = this.valueTitle.substring(
          0,
          this.valueTitle.lastIndexOf(', ')
        )
      }
      // if (this.isCheck) {
      //   if (this.arr.length === 0 && !indeterminate) { // 当点选和勾选切换时清空内容
      //     this.valueTitle = ''
      //   }
      //   if (checked && !indeterminate) { // 手动点击时
      //     if (!node.children) { // 当是父级的时候，不添加
      //       this.valueTitle += node.name + ', '
      //       this.getChildrenId(node)
      //     }
      //   } else if (!checked && indeterminate) { // 设置默认值时
      //     if (this.valueTitle === '') { // 已存值的情况下，不再计算
      //       if (!node.children) { // 当是父级的时候，不添加
      //         this.valueTitle += node.name + ', '
      //         this.getChildrenId(node)
      //       }
      //     }
      //   } else {
      //     this.valueTitle = this.valueTitle.replace(node.name + ', ', '')
      //     this.removeChildrenId(node)
      //   }
      const v = new Set(this.arr) // 数组去重
      this.valueId = JSON.parse(JSON.stringify([...v]))
      const str = this.valueId.toString()
      // node[this.props.value] = this.valueId.toString() // 转成普通字符串
      // node[this.props.value] = JSON.stringify(this.valueId) // 转成json字符串
      this.$emit('getValue', str)
      this.$refs.selectInput.blur()
      // }
    },
    getChildrenId(node) {
      // 递归求出所有的末级分类
      if (node.children !== undefined && node.children.length !== 0) {
        node.children.forEach(item => {
          if (item.children === undefined) {
            // item.children.length === 0
            if (item.bizid) {
              this.arr.push(item.bizid)
            } else {
              this.arr.push(item.id)
            }
            this.valueTitle += node.name + ', '
          } else {
            this.getChildrenId(item)
          }
        })
      } else {
        if (node.bizid) {
          this.arr.push(node.bizid)
        } else {
          this.arr.push(node.id)
        }
        this.valueTitle += node.name + ', '
        // this.arr.push(node.bizid) // 放到数组中
      }
    },
    removeChildrenId(node) {
      // 递归移除没选中的末级分类
      if (node.children !== undefined && node.children.length !== 0) {
        node.children.forEach(item => {
          if (item.children === undefined) {
            // 递归移除所有子
            const idx = this.arr.indexOf(item.bizid)
            if (idx >= 0) {
              this.arr.splice(idx, 1)
            }
          } else {
            this.removeChildrenId(item)
          }
        })
      } else {
        const idx = this.arr.indexOf(node.bizid) // 移除自己
        if (idx >= 0) {
          this.arr.splice(idx, 1)
        }
      }
    },
    // 用于获取当前点击分类名称
    getCurrNodeName(node, checked) {
      let itemName = ''
      if (node.code === '1010000') {
        // 土地
        itemName = 'landColumns'
      } else if (node.code === '1020000') {
        // 房屋
        itemName = 'buildingColumns'
      } else if (node.code === '1030000') {
        // 构筑物
        itemName = 'structureColumns'
      } else if (node.code === '2000000') {
        // 通用设备
        itemName = 'usualDeviceColumns'
      } else if (node.code === '2030000') {
        // 车辆
        itemName = 'vehicleColumns'
      } else if (node.code === '3000000') {
        // 专用设备
        itemName = 'dedicatedColumns'
      } else if (node.code === '4000000') {
        // 文物和陈列品
        itemName = 'collectionColumns'
      } else if (node.code === '5000000') {
        // 图书、档案
        itemName = 'booksColumns'
      } else if (
        node.code === '6010000' ||
        node.code === '6020000' ||
        node.code === '6050000'
      ) {
        // 家具用具装具
        itemName = 'furnitureColumns'
      } else if (node.code === '6030000' || node.code === '6040000') {
        // 特种用途动植物
        itemName = 'biologyColumns'
      } else if (node.code === '7010000') {
        // 专利类
        itemName = 'patentsColumns'
      } else if (node.code === '7020000') {
        // 非专利技术类
        itemName = 'skillsColumns'
      } else if (node.code === '7030000') {
        // 著作权类
        itemName = 'compositionColumns'
      } else if (node.code === '7040000') {
        // 资源资质类
        itemName = 'aptitudeColumns'
      } else if (node.code === '7040101') {
        // 土地使用权
        itemName = 'landTenureColumns'
      } else if (node.code === '7050000') {
        // 商标权类
        itemName = 'brandColumns'
      } else if (node.code === '7060000') {
        // 信息数据类
        itemName = 'informationColumns'
      } else if (node.code === '7060300') {
        // 计算机软件
        itemName = 'softwareColumns'
      } else if (node.code === '7070000') {
        // 经营类
        itemName = 'manageColumns'
      } else if (
        node.code === '8000000' ||
        node.code === '8010000' ||
        node.code === '8020000' ||
        node.code === '8030000' ||
        node.code === '8990000'
      ) {
        // 公共基础设施
        itemName = 'utilitiesColumns'
      } else if (
        node.code === '9000000' ||
        node.code === '9010000' ||
        node.code === '9020000'
      ) {
        // 文物文化资产
        itemName = 'cultureColumns'
      } else if (
        node.code === 'A000000' ||
        node.code === 'A010000' ||
        node.code === 'A020000' ||
        node.code === 'A030000' ||
        node.code === 'A040000' ||
        node.code === 'A050000' ||
        node.code === 'A060000' ||
        node.code === 'A070000' ||
        node.code === 'A990000'
      ) {
        // 保障性住房
        itemName = 'housingColumns'
      } else if (
        node.code === 'B000000' ||
        node.code === 'B010000' ||
        node.code === 'B020000' ||
        node.code === 'B030000' ||
        node.code === 'B040000' ||
        node.code === 'B990000'
      ) {
        // 政府储备物资
        itemName = 'restockColumns'
      } else if (node.code === 'C000000') {
        // 受托代理资产
        itemName = 'agencyAssetColumns'
      }
      if (checked) {
        if (itemName !== '') {
          this.nodeNameArr.push(itemName)
        }
      } else {
        this.nodeNameArr.forEach((v, ids) => {
          if (v === itemName) {
            this.nodeNameArr.splice(ids, 1) // 删除指定的一个元素
          }
        })
      }
      if (this.nodeNameArr.length === 1) {
        this.specTitle = this.nodeNameArr[0]
      } else {
        this.specTitle = '' // 默认传参
        if (this.nodeNameArr.length > 1) {
          // 创建新数组去重再判断，不改变原来的数组
          const ary = new Set(this.nodeNameArr)
          const newAry = JSON.parse(JSON.stringify([...ary]))
          if (newAry.length === 1) {
            // 有值才修改
            this.specTitle = newAry[0]
          }
        }
      }
    },
    handleTreeList() {
      if (this.options.length === 0) {
        this.$emit('treeData')
      }
    }
  }
}
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: 26px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
