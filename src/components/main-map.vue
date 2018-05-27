<template>
  <div class="map-container">
    <GmapMap
        :center="center"
        :zoom="7"
        style="width: 100%; height: 100%"
        :options="{disableDefaultUI:true}"
        @click="geolocation($event)"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          @click="center=m.position"
        />
    </GmapMap>
    <b-modal ref="markerModal" hide-footer  hide-header-close title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
        <div v-if="currentMarker">
          <p>Локация: </p>
          <p>{{currentMarker.position.lat}}</p>
          <p>{{currentMarker.position.lng}}</p>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
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
    geolocation(event) {
      if(!this.isCanAddMarker){
        return;
      }
      this.currentMarker = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      }
      this.markers.push(this.currentMarker);
      this.$refs.markerModal.show()
      console.log(event.latLng.lat());
      console.log(event.latLng.lng())
    },
    hideModal() {
      this.markers = this.markers.filter(i => i.id !== this.currentMarker.id);
      this.$store.dispatch('toggleAddMarker');
      this.$refs.markerModal.hide();
    }
  },
  data(){
    return {
      markers: [],
      currentMarker: null,
      center: {lat:50.412739882464216, lng:30.53206800636599}
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
