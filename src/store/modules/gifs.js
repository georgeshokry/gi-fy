import axios from 'axios';

const state = {
  gifs: [],
  autoCompleteText: [],
  currentOffset: 20,
  total_count: 500,
  isLoading: false,
  count: 20,
};

const getters = {
  getTrendingGifs: state => state.gifs,
  getLoadingState: state => state.isLoading,
  getFinalPage: state => (state.currentOffset > state.total_count)
};

const actions = {
  async fetchTrendingGifs({commit, state}){
    // check if it reached final page
    if(state.total_count >= state.currentOffset ){
      commit('setLoading', true)
      await axios.get(`https://api.giphy.com/v1/gifs/trending?&api_key=VewFuptyPsptR31WeH3TP6QCNEltqEuM&limit=${state.count}&offset=${state.currentOffset}`)
      .then(response => {
        if(response.data.data && response.data.data.length){
          
          commit('setTrendingGifs', response.data.data)
          commit('setIncreamentedOffset', state.currentOffset + state.count)
          commit('setNewCount', response.data.pagination.total_count )
          console.log("GGGGGGGGGGGGGG", state.currentOffset + state.count, response.data.pagination.total_count)
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
      commit('setLoading', false)
    }
  },
  async fetchGifsBySuggetion({commit, state}, keyword){
    if(state.total_count >= state.currentOffset ){
      commit('setLoading', true)
      await axios.get(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=VewFuptyPsptR31WeH3TP6QCNEltqEuM&limit=${state.count}&offset=${state.currentOffset}`)
      .then(response => {
        if(response.data.data && response.data.data.length){
          commit('setTrendingGifs', response.data.data)
          commit('setIncreamentedOffset', state.currentOffset + state.count)
          commit('setNewCount', response.data.pagination.total_count )
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
      commit('setLoading', false)
    }
  },
  resetGifs({commit}){
    commit('resetGifsArray')
    commit('setIncreamentedOffset', 0)
  },
  resetSearch({dispatch}){
    dispatch('resetGifs');
    dispatch('fetchTrendingGifs');
  }
};

const mutations = {
  setTrendingGifs: (state, gifs) => (state.gifs = state.gifs.concat(gifs)),
  setIncreamentedOffset: (state, newOffset) => (state.currentOffset = newOffset),
  setLoading: (state, loading) => (state.isLoading = loading),
  resetGifsArray: (state) => (state.gifs.splice(0, state.gifs.length)),
  setNewCount: (state, newCount) => (state.total_count = newCount)
};

export default {
  state,
  getters,
  actions,
  mutations
};