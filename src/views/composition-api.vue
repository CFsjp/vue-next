<template>
  <div class="api-wrap">
    <h1>{{ state.count }} * 2= {{ double }}</h1>
    <h2>{{ num }}</h2>
    <button @click="add">
      累加
    </button>
    <el-button @click="dialogVisible = true">
      点击打开 Dialog
    </el-button>
    <son-dialog :dialog-visible.sync="dialogVisible" />
    <!-- <el-select v-model="value" placeholder="请选择">
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-option-group>
    </el-select> -->
    <h1>{{ time.now }}</h1>
    <el-button @click="addDay">
      day + 1
    </el-button>
    <p>{{ shallowState.a }}</p>
    <p>{{ shallowState.gf.b }}</p>
    <p>{{ shallowState.gf.f.c }}</p>
    <p>{{ shallowState.gf.f.s.d }}</p>
    <el-button @click="change">
      change
    </el-button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, reactive, shallowRef, triggerRef } from '@vue/composition-api'
import { useCounter } from './api/useCounter'
import sonDialog from '@/components/son-dialog.vue'
/**
 * setup composition的入口，在beforeCreate和created中间调用，函数返回的内容会作为模板渲染的上下文
 * reactive 负责声明响应式复杂数据结构
 * ref 声明基本的响应式的数据结构
 * 在template中使用的ref的数据，那么vue会自动帮我们添加.value
 * 先判断类型，是ref就添加；通过原型上的__V_isRef的值
 *
 * 递归监听存在的问题--如果数据量比较大，非常消耗性能
 * 非递归监听--shallowRef / shallowReactive
 * 如果触发非递归监听属性更新界面？--如果是shallowRef类型数据，可以通过triggerRef来触发
 * 应用场景--一般情况下，使用ref和reactive即可，只有在需要监听的数据量比较大的时候，
 * 才使用shallowRef / shallowReactive
 *
 * composition api 可以有效的避免上下反复横跳和mixin数据来源不清晰的问题
 */
export default {
  components: { sonDialog },
  // props是响应式的，解构会使响应式断开
  // context是普通js对象，不是响应式可以使用解构
  setup() {
    const { state, double } = useCounter(1, 0)
    const num = ref(2)
    const dialogVisible = ref(false)
    const { time, addDay } = useObject()
    const { shallowState, change } = useDeepWatch()

    function add() {
      state.count++
      num.value += 10
    }
    onMounted(() => {
      console.log('学习composition-api')
    })
    return { state, add, double, num, dialogVisible, time, addDay, shallowState, change }
  }
}
function useObject() {
  const time = reactive({ now: new Date() })

  function addDay() {
    const newTime = new Date(time.now.getTime())
    // 修改对象的中属性，想实现响应式，必须通过重新赋值的方法
    newTime.setDate(newTime.getDate() + 1)
    time.now = newTime
    console.log(time.now)
  }

  return { time, addDay }
}

function useDeepWatch() {
  const shallowState = shallowRef({
    a: 'a',
    gf: {
      b: 'b',
      f: {
        c: 'c',
        s: {
          d: 'd'
        }
      }
    }
  })

  function change() {
    shallowState.value.gf.f.s.d = '4'
    triggerRef(shallowState)
  }

  return { shallowState, change }
}
</script>
<style lang="scss" scoped>
.api-wrap {
  text-align: center;
}
</style>
