import Vue from 'vue'
import Vuex from 'vuex'
import { card } from './card-list'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    card: {
      namespaced: true,
      ...card
    }
  }
})
