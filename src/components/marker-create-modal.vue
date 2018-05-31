<template>
    <b-modal ref="myModalRef" hide-header hide-footer no-close-on-backdrop centered no-close-on-esc>
        <b-form @submit="saveMarker" class="flex-container">
            <div class="aside-header" v-if="currentMarker">
                <span>Тип маркеру: </span>
                <span>
                   {{TRANSLATES.MARKER_TYPES[currentMarker.type]}}
                </span>
            </div>
            <div class="aside-body">
                <b-form-select v-model="markerOptions.animalType" class="mb-3" required>
                    <option :value="null">Оберіть вид тварини</option>
                    <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                        {{animalType.text}}
                    </option>
                </b-form-select>
                <b-form-select v-model="markerOptions.animalBreed" class="mb-3" required v-if="animalBreeds">
                    <option :value="null">Оберіть породу тварини</option>
                    <option :value="animalBreed.value"
                            v-for="(animalBreed, index) of animalBreeds[markerOptions.animalType]" :key="index">
                        {{animalBreed.text}}
                    </option>
                </b-form-select>
                <b-form-input v-model="markerOptions.age" type="text" placeholder="Вік тварини" class="mb-3"
                              required></b-form-input>
                <b-form-select v-model="markerOptions.color" class="mb-3" required>
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
                                 class="mb-3"
                                 required>
                </b-form-textarea>
                <b-form-input v-model="markerOptions.photoUrl" type="text" placeholder="Фото тварини" class="mb-3"
                              required></b-form-input>
                <img :src="markerOptions.photoUrl" alt="" class="animal-photo">


            </div>
            <div class="aside-footer">
                <button type="submit" class="btn btn-outline-primary btn-block">Зберегти</button>
                <button type="button" class="btn btn-outline-danger btn-block" @click="cancel()">Скасувати</button>
            </div>
        </b-form>
    </b-modal>
</template>

<script>
    import {TRANSLATES} from '../const/translates.js';

    export default {
        name: "marker-create-modal",
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
            }
        },
        mounted(){
            this.$root.$on('openModal', () => {
                this.$refs.myModalRef.show()
            });
        },
        methods: {
            cancel() {
                this.$store.dispatch('cancelMarkerAdding');
                this.$store.dispatch('deactivateMarkerAdding');
                this.$refs.myModalRef.hide();
            },
            close() {
                this.$store.dispatch('deactivateMarkerAdding');
                this.$store.dispatch('closeAside');
            },
            saveMarker(event) {
                event.preventDefault();
                this.$store.dispatch('saveMarker', this.markerOptions);
                this.$store.dispatch('deactivateMarkerAdding');
                Object.keys(this.markerOptions).forEach(i => this.markerOptions[i] = null);
                this.$refs.myModalRef.hide();
            },
            deleteMarker() {
                this.$store.dispatch('deleteMarker');
            }
        },
        data() {
            return {
                TRANSLATES: TRANSLATES,
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

<style scoped>

</style>