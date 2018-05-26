<template>
  <div class="map-container">
    <GmapMap
        :center="{lat:50.412739882464216, lng:30.53206800636599}"
        :zoom="7"
        style="width: 100%; height: 100%"
        :options="{disableDefaultUI:true}"
        @click="geolocation($event)"
      >
        <!-- <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        /> -->
    </GmapMap>
    <b-modal ref="markerModal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDlpx51qYhOUmxAcMXLZo3adhxvdx1MRy4',
    libraries: 'places', 
  },
})
export default {
  name: 'main-map',
   computed: {
      isCanAddMarker() {
          return this.$store.state.isCanAddMarker;
      },
  },
  methods: {
    geolocation : function(event) {
      if(!this.isCanAddMarker){
        return;
      }
      this.$refs.markerModal.show()
      console.log(event.latLng.lat());
      console.log(event.latLng.lng())
    }
  }
  
}
</script>

<style lang="scss">
.map-container{
  height: 100vh;
  width: 100%;
}

</style>
