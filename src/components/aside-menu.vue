<template>
    <div class="aside" v-bind:class="{ active: openAside}">
        <div class="flex-container" v-if="currentMarker">
            <div class="aside-header">
                {{translates.MARKER_TYPES[currentMarker.type]}} !
            </div>
            <div class="aside-body" v-if="currentMarker.animalType">
                <img :src="currentMarker.photoUrl" alt="" class="animal-photo">
                <div class="mb-3">
                    <div class="label">Вид тварини</div>
                    {{translates.ANIMAL_TYPES[currentMarker.animalType]}}
                </div>
                <div class="mb-3">
                    <div class="label">Порода тварини</div>
                     {{translates.BREEDS[currentMarker.animalType][currentMarker.animalBreed]}}
                </div>
                <div class="mb-3">
                    <div class="label">Вік тварини</div>
                    {{currentMarker.age}}
                </div>
                <div class="mb-3">
                    <div class="label">Колір тварини</div>
                    {{translates.ANIMAL_COLORS[currentMarker.color]}}
                </div>
                <div class="mb-3">
                    <div class="label">Контактна інформація</div>
                    {{currentMarker.contactInfo}}
                </div>
            </div>
            <div class="aside-footer">
                <button type="button" class="btn btn-outline-dark btn-block" @click="deleteMarker()" v-b-popover.hover="'Натисніть, якщо знайдено власника або тварину'">
                    <span v-if="currentMarker.type == 'lost'">Тварина знайдена</span>
                    <span v-if="currentMarker.type == 'find'">Власника знайдено</span>
                </button>
                <button type="button" class="btn btn-outline-danger btn-block" @click="close()">Закрити</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'aside-menu',
        computed: {
            openAside() {
                return this.$store.state.openAside;
            },
            currentMarker() {
                return this.$store.state.currentMarker;
            },
            asideMode() {
                return this.$store.state.asideMode;
            },
            animalTypes() {
                return this.$store.state.settings.ANIMAL_TYPES;
            },
            animalBreeds() {
                return this.$store.state.settings.ANIMAL_BREEDS;
            },
            animalColors() {
                return this.$store.state.settings.ANIMAL_COLORS;
            },
            translates() {
                return this.$store.state.settings.TRANSLATES;
            }

        },
        methods: {
            cancel() {
                this.$store.dispatch('cancelMarkerAdding');
                this.$store.dispatch('deactivateMarkerAdding');
                this.$store.dispatch('closeAside');
            },
            close() {
                this.$store.dispatch('deactivateMarkerAdding');
                this.$store.dispatch('closeAside');
            },
            saveMarker(event) {
                event.preventDefault();
                this.$store.dispatch('saveMarker', this.markerOptions);
                this.$store.dispatch('deactivateMarkerAdding');
                this.$store.dispatch('closeAside');
                Object.keys(this.markerOptions).forEach(i => this.markerOptions[i] = null);
            },
            deleteMarker() {
                this.$store.dispatch('deleteMarker');
            }
        },
        data() {
            return {
                markerOptions: {
                    animalType: null,
                    animalBreed: null,
                    age: null,
                    color: null,
                    contactInfo: null,
                    photoUrl: null
                }
            }
        }

    }
</script>

<style lang="scss">
    .aside {
        width: 320px;
        position: fixed;
        background: white;
        top: 0;
        right: -320px;
        bottom: 0;
        z-index: 997;
        transition: right .3s;
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, .2);
        .label{
            color: gray;
            font-size: 12px;
            margin-bottom: 2px;
        }
        &.active {
            right: 0;
        }
        .flex-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
        &-header {
            padding: 8px;
            text-align: center;
            font-size: 24px;
            color: #dc3545;
            font-weight: bold;
        }
        &-body {
            flex: 1 1 auto;
            overflow: auto;
            padding: 8px;
            .animal-photo {
                width: 100%;
                height: auto;
                margin-bottom: 8px;
            }
        }
        &-footer {
            padding: 0 8px;
            button {
                margin: 8px 0;
            }
        }
    }

</style>
