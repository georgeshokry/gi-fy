import axios from 'axios';

const state = {
  gifs: [],
  autoCompleteText: [],
  currentOffset: 0,
  offsetLimit: 299, //maximum offset
  isLoading: false
};

const getters = {
  getTrendingGifs: state => state.gifs,
  getLoadingState: state => state.isLoading,
  getFinalPage: state => (state.currentOffset > state.offsetLimit)
};

const actions = {
  async fetchTrendingGifs({commit, state}){
    // check if it reached final page
    if(state.currentOffset < state.offsetLimit){
      commit('setLoading', true)
      await axios.get(`https://api.giphy.com/v1/gifs/trending?&api_key=VewFuptyPsptR31WeH3TP6QCNEltqEuM&limit=24&offset=${state.currentOffset}`)
      .then(response => {
        if(response.data.data && response.data.data.length){
          commit('setTrendingGifs', response.data.data)
          commit('setIncreamentedOffset', state.currentOffset + 24)
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
      commit('setLoading', false)
    }
  }
};

const mutations = {
  setTrendingGifs: (state, gifs) => (state.gifs = state.gifs.concat(gifs)),
  setIncreamentedOffset: (state, newOffset) => (state.currentOffset = newOffset),
  setLoading: (state, loading) => (state.isLoading = loading),
};

export default {
  state,
  getters,
  actions,
  mutations
};