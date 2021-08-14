<template>
  <v-container fluid class="pa-2">
    <v-row class="results-end__loading-more" justify="center" v-intersect="onIntersect">
          <v-progress-linear
            v-if="!getFinalPage"
            color="purple darken-4"
            indeterminate
            rounded
            height="6"
            
          ></v-progress-linear>
          <v-expand-transition>
              <v-card
                max-width="500"
                outlined
                elevation="2"
                v-if="getFinalPage"
                class="pa-5"
                color="purple darken-4"
              >
              <v-list-item-title class="text-h5 pr-3 pl-3 text-center">
                <span class="results-end__text">End Of Result</span>
              </v-list-item-title>
              
              <v-img
                height="161"
                width="375"
                src="https://media.giphy.com/media/5bo7UYW69cYQZA4tOF/giphy.gif"
              >
              </v-img>
                <v-card-actions>
                    <v-btn
                        v-if="getkeyword"
                        
                        outlined
                        color="white"
                        @click="resetSearch()"
                        elevation="2"
                    >
                        Clear Search
                    </v-btn>
                </v-card-actions>
            </v-card>
          </v-expand-transition>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'ResultsEnd',
    data: () => ({
    }),
    computed: mapGetters(["getFinalPage", "getkeyword", "getLoadingState"]),
    methods:{
         onIntersect () {
             console.log("GGGGG", this.getFinalPage)
            if(!this.getFinalPage && !this.getLoadingState){ //it may reached final page
                    if(this.getkeyword){//check if user search gifs then load gifs by keyword
                        this.$store.dispatch('fetchGifsBySuggetion', this.getkeyword)
                    }else{
                        this.$store.dispatch('fetchTrendingGifs')
                    }
            }
        },
        resetSearch(){
            this.$store.dispatch('resetSearch')
            this.$store.dispatch('resetSearchKeyword')
        }
    }
};
</script>
<style scoped>
.results-end__loading-more{
  bottom: 0;
  width: 100%;
  padding: 25px;
}
.results-end__text{
    color: white; 
    margin-bottom: 20px;
}
</style>