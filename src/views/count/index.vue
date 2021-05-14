<template>
  <div>
    <h1>{{ count }}</h1>
    <el-button @click="changeCount(1)">
      +
    </el-button>
    <el-button @click="changeCount(-1)">
      -
    </el-button>
    <el-button @click="downExcel()">
      down
    </el-button>
    <a href="./favicon.ico">1111</a>
    <div>
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <i
          class="el-icon-edit el-input__icon cursor"
          slot="suffix"
          @click="handleIconClick"
        />
      </el-autocomplete>
    </div>
    <div>
      <el-cascader
        :options="options"
        :props="cascadeProps"
        clearable
        :show-all-levels="false"
        collapse-tags
        :filterable="true"
        @change="cascaderChange"
        @expand-change="cascaderExpandChange"
        @blur="blur"
        @visible-change="visibleChange"
      ></el-cascader>
    </div>
    <div>
      <el-table :data="tableData" style="width: 800px" max-height="250">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120"
        ></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        ></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <h2>{{ a }}</h2>
      <h2>{{ b }}</h2>
      <el-button @click="assign">
        合并
      </el-button>
    </div>
    <div>
      <el-input
        type="number"
        size="small"
        width="50"
        v-model="testNum"
        placeholder="请输入数字"
        ref="input"
        @keyup="testNum = checkInput(testNum)"
      />
    </div>
  </div>
</template>

<script>
import { useVuex, useQuerySearch, useCascader, useTable, useApi } from './hook'

export default {
  setup(props, { root }) {
    const { count, changeCount, downExcel } = useVuex(root)
    const {
      restaurants,
      state,
      querySearch,
      handleSelect,
      handleIconClick
    } = useQuerySearch()

    const {
      cascadeProps,
      options,
      cascaderChange,
      cascaderExpandChange
    } = useCascader()

    const { tableData, deleteRow } = useTable()
    const { a, b, assign, testNum } = useApi()

    return {
      count,
      changeCount,
      downExcel,
      restaurants,
      state,
      querySearch,
      handleSelect,
      handleIconClick,
      cascadeProps,
      options,
      cascaderChange,
      cascaderExpandChange,
      tableData,
      deleteRow,
      a,
      b,
      assign,
      testNum
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
</style>
