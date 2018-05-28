<template>
    <div class="aside" v-bind:class="{ active: openAside}">
        <div class="aside-header" v-if="currentMarker">
            {{markerTypes[currentMarker.type]}}
        </div>
        <div class="aside-body">
            <div v-if="asideMode == 'edit'">
                <b-form-select v-model="markerOptions.animalType" class="mb-3">
                    <option :value="null">Оберіть вид тварини</option>
                    <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                        {{animalType.text}}
                    </option>
                </b-form-select>
                <b-form-select v-model="markerOptions.animalBreed" class="mb-3">
                    <option :value="null">Оберіть породу тварини</option>
                    <option :value="animalBreed.value"
                            v-for="(animalBreed, index) of animalBreeds[markerOptions.animalType]" :key="index">
                        {{animalBreed.text}}
                    </option>
                </b-form-select>
                <b-form-input v-model="markerOptions.age" type="text" placeholder="Вік тварини" class="mb-3"></b-form-input>
                <b-form-select v-model="markerOptions.color" class="mb-3">
                    <option :value="null">Оберіть колір тварини</option>
                    <option :value="animalColor.value"
                            v-for="(animalColor, index) of animalColors" :key="index">
                        {{animalColor.text}}
                    </option>
                </b-form-select>
                <b-form-textarea id="contactInfo"
                                 v-model="markerOptions.contactInfo"
                                 placeholder="Контактна інформация"
                                 :rows="3"
                                 :max-rows="6"
                                 class="mb-3">
                </b-form-textarea>
                <b-form-input v-model="markerOptions.photoUrl" type="text" placeholder="Фото тварини" class="mb-3"></b-form-input>
                <img :src="markerOptions.photoUrl" alt="" class="animal-photo">
            </div>
            <div v-if="asideMode == 'view'">
                <div class="mb-3">
                    {{currentMarker.animalType}}
                </div>
                <div class="mb-3">
                    {{currentMarker.animalBreed}}
                </div>
                <div class="mb-3">
                    {{currentMarker.age}}
                </div>
                <div class="mb-3">
                    {{currentMarker.color}}
                </div>
                <div class="mb-3">
                    {{currentMarker.contactInfo}}
                </div>
                <img :src="currentMarker.photoUrl" alt="" class="animal-photo">
            </div>
        </div>
        <div class="aside-footer">
            <div v-if="asideMode == 'edit'">
                <button type="button" class="btn btn-outline-primary btn-block" @click="saveMarker()">Зберегти</button>
                <button type="button" class="btn btn-outline-danger btn-block" @click="cancel()">Скасувати</button>
            </div>
            <div v-if="asideMode == 'view'">
                <button type="button" class="btn btn-outline-danger btn-block" @click="close()">Закрити</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {MARKER_TYPES} from '../const/translates.js';
    import {ANIMAL_TYPES} from '../const/animalTypes.js';
    import {ANIMAL_BREEDS} from '../const/animalBreeds.js';
    import {ANIMAL_COLORS} from '../const/animalColors.js';

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
            }
        },
        methods: {
            cancel() {
                this.$store.dispatch('cancelMarkerAdding');
                this.$store.dispatch('diactivateMarkerAdding');
                this.$store.dispatch('closeAside');
            },
            close(){
                this.$store.dispatch('diactivateMarkerAdding');
                this.$store.dispatch('closeAside');
            },
            saveMarker() {
                this.$store.dispatch('saveMarker', this.markerOptions);
                this.$store.dispatch('diactivateMarkerAdding');
                this.$store.dispatch('closeAside');
                Object.keys(this.markerOptions).forEach(i => this.markerOptions[i] = null);
            }
        },
        data() {
            return {
                markerTypes: MARKER_TYPES,
                animalTypes: ANIMAL_TYPES,
                animalBreeds: ANIMAL_BREEDS,
                animalColors: ANIMAL_COLORS,
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
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &.active {
            right: 0;
        }
        &-body{
            flex: 1 1 auto;
            .animal-photo{
                width: 100%;
                height: auto;
            }
        }
        &-footer{
            button{
                margin: 8px 0;
            }
        }
    }

</style>
