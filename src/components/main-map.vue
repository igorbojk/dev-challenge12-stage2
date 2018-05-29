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
                    v-for="(marker, index) in markers"
                    :position="marker.position"
                    :clickable="true"
                    @click="setCurrentMarker(marker)"
                    :icon="marker.icon"
            />
            <!--<GmapCircle-->
                <!--:center="center"-->
                <!--:radius="5000"-->
            <!--/>-->
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
        computed: {
            isCanAddMarker() {
                return this.$store.state.isCanAddMarker;
            },
            markers() {
                return this.$store.state.filteredMarkers;
            },

        },
        methods: {
            geolocation(event) {
                if (!this.isCanAddMarker) {
                    return;
                }
                const markerPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }
                this.$store.dispatch('addNewMarker', markerPosition);
            },
            setCurrentMarker(marker) {
                if (this.isCanAddMarker) {
                    return;
                }
                this.center = marker.position;
                this.$store.dispatch('setCurrentMarker', marker);
                this.$store.dispatch('setAsideMode', 'view');
                this.$store.dispatch('openAside');
            },
        },
        data() {
            return {
                center: {lat: 50.412739882464216, lng: 30.53206800636599}
            }
        },
        mounted() {
            this.$store.dispatch('getData');
            this.$store.dispatch('setMarkers');
        }

    }
</script>

<style lang="scss">
    .map-container {
        height: 100vh;
        width: 100%;
    }

</style>
