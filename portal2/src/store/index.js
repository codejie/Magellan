import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import person from './modules/person'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    person
  },
  getters
})

export default store
