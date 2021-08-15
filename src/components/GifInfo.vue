<template>
  <v-container fluid>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="openDetails"
        persistent
      >
      <v-card
        >
          <v-img
              height="auto"
              width="600px"
              :src="getImageSrc(gifInfoObject.images)"
          ></v-img>

          <v-card-title class="gif-info__title">
            {{gifInfoObject.title}}             
          </v-card-title>
          <v-card-subtitle>
            {{viewByName(gifInfoObject.username)}}
            <br v-if="gifInfoObject.username">
            Rate: <span class="font-weight-bold gif-info__rate">{{gifInfoObject.rating}}</span>
          </v-card-subtitle>
          <v-card-subtitle>
            <!-- copy link -->
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }" >
            <v-btn
              small
              elevation="1"
              fab
              icon
              @click="copyLink(gifInfoObject)"
              class="mr-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="purple darken-4">
                mdi-link-variant
              </v-icon>
            </v-btn>
                </template>
              <span>{{copied ? 'link copied!' : 'click to copy!'}}</span>
            </v-tooltip>
            <!-- link to giphy -->
            <v-tooltip top>
            <template v-slot:activator="{ on, attrs }" >
            <v-btn
              small
              elevation="1"
              fab
              icon
              target="_blank"
              :href="gifInfoObject.url"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="purple darken-4">
                mdi-open-in-new
              </v-icon>
            </v-btn>
            </template>
              <span>open on Giphy</span>
            </v-tooltip>
          </v-card-subtitle>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="closeDialog()"
            >Close</v-btn>
          </v-card-actions>

        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import imageLink from "@/mixins/imageLink.js"
  export default {
    name: 'GifInfo',
    mixins:[imageLink],
    props:{
        openDetails: {
            type: Boolean,
            required: true,
            default:()=>{
                return false;
            }
        },
        gifInfoObject:{
            type: Object,
            required: true,
            default:()=>{
                return false;
            }
        }
    },
    data: () => ({
      hoveredItemIndex: null,
      copied:false
    }),
    methods:{
        closeDialog(){
            this.$emit("closeDialog")
        },
        copyLink(item){
        if(item.url){
          const cb = navigator.clipboard;
          cb.writeText(item.url).then(() => {this.copied = true});
          setTimeout(()=>{
            this.copied = false
          }, 3000)
        }
      },
      viewByName(name){
        if(name){
          return 'By: ' + name
        }
        return ''
      }
    }
  }
</script>
<style scoped>
.gif-info__title{
  color: #4a148c ;
}
.gif-info__rate{
  text-transform: capitalize;
}
</style>
