import Vuex from 'vuex';
import Vue from 'vue';
import gifs from './modules/gifs';
import autocomplete from './modules/autocomplete';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gifs,
    autocomplete
  }
});