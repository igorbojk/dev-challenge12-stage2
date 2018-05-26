<template>
  <div class="main-menu">
   <button type="button" class="btn btn-outline-primary btn-block" @click="toggleAddMarker()">Додати маркер</button>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
	methods: {
	    toggleAddMarker() {
	        this.$store.dispatch('toggleAddMarker');
	    }
	},
}
</script>

<style lang="scss">
.main-menu{
  // width: 320px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 997;
  background: white;
  padding: 8px;
  box-shadow: 0px 2px 5px 1px rgba(0,0,0,.2);
  border-radius: 2px;
}

</style>
