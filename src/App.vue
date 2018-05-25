<template>
  <div id="app">
    <main-map></main-map>
  </div>
</template>

<script>
import MainMap from './components/main-map.vue';

export default {

  name: 'app',
  components: {
    MainMap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
