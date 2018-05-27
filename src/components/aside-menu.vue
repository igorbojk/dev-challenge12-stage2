<template>
  <div class="aside"  v-bind:class="{ active: openAside}">
   <div v-if="currentMarker">
     {{currentMarker.type}}
   </div>
   <button type="button" class="btn btn-outline-danger " @click="closeAside()">Закрити</button>
  </div>
</template>

<script>
export default {
  name: 'aside-menu',
  computed: {
    openAside(){
      return this.$store.state.openAside;
    },
    currentMarker(){
      return this.$store.state.currentMarker;
    }
  },
  methods: {
    closeAside() {
      this.$store.dispatch('diactivateMarkerAdding');
      this.$store.dispatch('closeAside');
    }
  }
  
}
</script>

<style lang="scss">
.aside{
  width: 320px;
  position: fixed;
  background: white;
  top: 0;
  right: -320px;
  bottom: 0;
  z-index: 997;
  transition: right .3s;
  &.active{
    right: 0;
  }
}

</style>
