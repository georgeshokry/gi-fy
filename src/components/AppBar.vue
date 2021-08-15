<template>
    <v-app-bar
      app
      color="purple darken-4"
      dark
      elevate-on-scroll
    >
    <v-row no-gutters>
        <v-col
            cols="6"
            md="5"
            sm="5"
             class="d-flex align-content-center flex-wrap"
        >
            <div  class="d-flex align-content-center flex-wrap">
                <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="https://seeklogo.com/images/G/giphy-logo-CEB690257C-seeklogo.com.png"
                transition="scale-transition"
                width="40"
                /> 
                <div class="headline  d-flex align-content-center flex-wrap">Gi-Fy</div>
            </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
            cols="5"
            md="4"
            sm="4"
             class="d-flex align-content-center flex-wrap"
        >
            <v-autocomplete
                v-model="searchText"
                :items="getSuggestions"
                :loading="getLoadingSuggestions"
                :search-input.sync="search"
                color="white"
                hide-selected
                placeholder="Start typing to Search gifs..."
                prepend-icon="mdi-magnify"
                return-object
                dense
                rounded
                class="pt-5"
                clearable
                :append="resetSearch"
            >

            </v-autocomplete>
        </v-col>
       </v-row>
    </v-app-bar>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: 'AppBar',
  data: () => ({
      searchText: '',
      isLoading: false,
      search: ''

  }),
  computed: mapGetters(["getLoadingSuggestions", "getSuggestions"]),
  created(){

  },
  watch:{
    search (val) {
        this.fetchSuggestions(val)
    },
    searchText(val){
        this.fetchGifsBySuggetion(val)
    }
  },
  methods:{
      fetchSuggestions(val){
        if(!this.getLoadingSuggestions && val){
            this.$store.dispatch("fetchSuggestions", val);
        }
      },
      async fetchGifsBySuggetion(val){
          this.$vuetify.goTo(0)
          if(val){
              this.$store.dispatch('resetGifs');
              await this.$store.dispatch('fetchGifsBySuggetion', val)
          }else{
              this.resetSearch();
          }
      },
      resetSearch(){
            this.$store.dispatch('resetSearch');
            this.$store.dispatch('resetSearchKeyword');
      }
  }
};
</script>