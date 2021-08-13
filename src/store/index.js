import Vuex from 'vuex';
import Vue from 'vue';
import gifs from './modules/gifs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gifs
  }
});