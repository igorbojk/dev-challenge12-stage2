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
  methods: {
    geolocation : function(event) {
      console.log(event.latLng.lat());
      console.log(event.latLng.lng())
    }
  }
  
}
</script>

<style lang="scss">
.map-container{
  height: 100vh;
}

</style>
