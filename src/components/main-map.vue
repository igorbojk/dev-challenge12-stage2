<template>
    <div class="map-container">
        <GmapMap
                ref="mapRef"
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
                    :title="`${translates.ANIMAL_TYPES[marker.animalType]}(${translates.BREEDS[marker.animalType][marker.animalBreed]})`"
            />
            <GmapCircle
                    v-if="circle.center"
                    :center="circle.center"
                    :radius="circle.radius"
            />
        </GmapMap>
    </div>
</template>

<script>
    export default {
        name: 'main-map',
        computed: {
            isCanAddMarker() {
                return this.$store.state.isCanAddMarker;
            },
            markers() {
                return this.$store.state.filteredMarkers;
            },
            isCanAddCenter() {
                return this.$store.state.isCanAddCenter;
            },
            circle() {
                return this.$store.state.circle;
            },
            translates() {
                return this.$store.state.settings.TRANSLATES;
            }
        },
        methods: {
            geolocation(event) {
                const markerPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                };
                if (this.isCanAddCenter) {
                    this.$store.dispatch('addCircleCenter', markerPosition);
                    return;
                }
                if (!this.isCanAddMarker) {
                    return;
                }
                this.$store.dispatch('addNewMarker', markerPosition);
                this.$root.$emit('openModal');

            },
            setCurrentMarker(marker) {
                if (this.isCanAddMarker) {
                    return;
                }
                this.center = marker.position;
                this.$store.dispatch('setCurrentMarker', marker);
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
