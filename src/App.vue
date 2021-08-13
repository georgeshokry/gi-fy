<template>
  <v-app class="app">
    <!-- main app on header -->
    <app-bar />
    <v-main>
      <gifs-viewer/>
    </v-main>
    <results-end />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import GifsViewer from './components/GifsViewer';
import ResultsEnd from './components/ResultsEnd.vue';
export default {
  name: 'App',
  components: {
    GifsViewer,
    AppBar,
    ResultsEnd
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.app{
  min-height: 180vh;
}
</style>
