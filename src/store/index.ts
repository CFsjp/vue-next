import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    SET_COUNT(state, count) {
      state.count += count
    }
  },
  actions: {
    asyncCount(ctx, data) {
      ctx.commit('SET_COUNT', data)
    }
  },
  modules: {}
})
