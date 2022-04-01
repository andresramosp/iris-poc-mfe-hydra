import { createStore, Store } from 'vuex'
import { Configuration, LineApiFactory } from "Shell/apiAtenea";

// define your typings for the store state
export interface State {
  lines: Array<Object>
}

const store: Store<State> = createStore({
  state() {
    return {
     lines: []
    }
  },
  mutations: {
    setLines(state, lines) {
      state.lines = lines
    },
  },
  actions: {
    async getLines(state) {
      const config = new Configuration({
        basePath: window.location.origin, // 1
      });
      const apiFactory = LineApiFactory(config);
      const result = await apiFactory.findLines()
      state.commit('setLines', result)
    }
  },
  getters: {
    lines(state) {
      return state.lines
    }
  }
})

export default store;