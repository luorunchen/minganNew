import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initStatus: '',
    DeviceProjectNewData: [],
    SoundSwitch: "开",
    map_lnglat: [116.397428, 39.90923],

  },
  mutations: {
    changeStatus(state, status) {  //  重复赋值
      state.initStatus = status;
    },
    DeviceProject(state, status) {  //  重复赋值
      state.DeviceProjectNewData = status;
    },
    set_map(state, status) {  //  重复赋值
      state.map_lnglat = status;
    },
    SoundSwitchFun(state, status) {  //  重复赋值
      state.SoundSwitch = status;
    },

  },
  actions: {
  },
  modules: {
  }
})
