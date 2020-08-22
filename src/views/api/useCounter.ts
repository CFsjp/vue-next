import { reactive, computed } from '@vue/composition-api'

export function useCounter(count: number, n: unknown) {
  const state = reactive({
    count
  })
  const double = computed(() => state.count * 2)
  return { state, double }
}
