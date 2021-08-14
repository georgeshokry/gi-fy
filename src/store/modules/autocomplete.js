import axios from 'axios';

const state = {
    suggestions: [],
    loadingSuggestions: false,
    keyword: ''
};

const getters = {
    getLoadingSuggestions: state => state.loadingSuggestions,
    getSuggestions: state => state.suggestions,
    getkeyword: state => state.keyword
};

const actions = {
    async fetchSuggestions({commit, state}, keyword){
          commit('setLoadingSuggestions', true)
          commit('setSuggestionKeyword', keyword)
          await axios.get(`https://api.giphy.com/v1/gifs/search/tags?q=${keyword}&api_key=VewFuptyPsptR31WeH3TP6QCNEltqEuM&limit=24&offset=${state.currentOffset}`)
          .then(response => {
            if(response.data.data && response.data.data.length > 0){
                let mappedSuggestions = response.data.data.map((item)=> item.name)
                commit('setSuggestions', mappedSuggestions)
            }
          })
          .catch(error => {
            console.log('Error', error);
          });
          commit('setLoadingSuggestions', false)
      },
      resetSearchKeyword({commit}){
        commit('resetSuggestions');
      }
};

const mutations = {
    setLoadingSuggestions: (state, status) => (state.loadingSuggestions = status),
    setSuggestions: (state, suggestion) => (state.suggestions = suggestion),
    setSuggestionKeyword: (state, keyword) => (state.keyword = keyword),
    resetSuggestions: (state) => (state.keyword = '')
};

export default {
  state,
  getters,
  actions,
  mutations
};