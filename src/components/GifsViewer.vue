<template>
  <v-container fluid>
    <v-sheet
      class="pa-3"
    >
    <div class="headline ">{{getkeyword ? `Search result for "${getkeyword}" ` : "Trending"}}</div>
    </v-sheet>
    <v-row
        v-masonry
        class="mb-5"
      >
        <v-col lg="2"  v-for="(item, index) in getTrendingGifs" :key="index">
          <v-lazy
              :options="{
                threshold: .9
              }"
              transition="fade-transition"
          >
              <v-img
                height="auto"
                :src="getImageSrc(item.images)"
                @load="$redrawVueMasonry()"
                @mousemove="showActions(index)"
                @mouseleave="removeActions()"
              >
              <template >
                  <div class="gifs-viewer__link" v-if="index == hoveredItemIndex" transition="scale-transition">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }" >
                      <v-icon
                          class="gifs-viewer__link-icon"
                          color="purple darken-4"
                          v-bind="attrs"
                          v-on="on"
                          @click="openDetailsDialog(item)"
                        >
                          mdi-information
                        </v-icon>
                    </template>
                      <span>{{copied ? 'link copied!' : 'click to copy!'}}</span>
                    </v-tooltip>
                  </div>
              </template>
              
                <template v-slot:placeholder>
                    <v-sheet
                      class="pa-3"
                    >
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="image"
                      ></v-skeleton-loader>
                    </v-sheet>
                </template>
              </v-img>
          </v-lazy>
        </v-col>
    </v-row>
    <gif-info :openDetails="openDetails" :gifInfoObject="gifInfoObject" @closeDialog="closeDialog"/>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import GifInfo from './GifInfo.vue';
import imageLink from '@/mixins/imageLink.js';
  export default {
  components: { GifInfo },
    name: 'GifsViewer',
    mixins: [imageLink],
    data: () => ({
      hoveredItemIndex: null,
      copied: false,
      openDetails: false,
      gifInfoObject: {}
    }),
    computed: mapGetters(["getTrendingGifs", "getLoadingState", "getFinalPage", "getkeyword"]),
    async created(){
      await this.$store.dispatch('fetchTrendingGifs')
    },
    methods:{
      showActions(itemIndex){
        this.hoveredItemIndex = itemIndex;
      },
      removeActions(){
        this.hoveredItemIndex = null;
      },
      openDetailsDialog(imageOpeject){
        this.gifInfoObject = imageOpeject;
        this.openDetails = true;
      },
      closeDialog(){
        this.openDetails = false;
      },
    }

  }
</script>
<style scoped>
.gifs-viewer__link{
  background: rgb(2,0,36);
  background: linear-gradient(340deg, rgb(255 255 255) 0%, rgba(74,20,140,0) 60%, rgb(0 212 255 / 0%) 100%);
  width: 100%;
  height: 100%;
}
.gifs-viewer__link-icon{
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}
</style>
