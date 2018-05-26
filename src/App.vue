<template>
  <div id="app">
    <main-menu></main-menu>
    <main-map></main-map>
    <aside-menu></aside-menu>

  </div>
</template>

<script>
import MainMap from './components/main-map.vue';
import AsideMenu from './components/aside-menu.vue';
import MainMenu from './components/main-menu.vue';
export default {

  name: 'app',
  components: {
    MainMenu,
    MainMap,
    AsideMenu
  }
}
</script>

<style>
#app {
  display: flex;
  height: 100vh;
  position: relative;
}
</style>
