<template>
    <div class="main-menu">
        <div class="action-title">
            Додати маркер
        </div>
        <div class="action-buttons">
            <button type="button" class="btn btn-outline-danger " @click="activateMarkerAdding('lost')"
                    :disabled="isCanAddMarker">Загублено
            </button>
            <button type="button" class="btn btn-outline-dark " @click="activateMarkerAdding('find')"
                    :disabled="isCanAddMarker">Знайдено
            </button>
        </div>
        <div class="filters-block">
            <div class="action-title">
                Фільтрувати
            </div>
            <b-form-select v-model="filters.type" class="mb-3">
                <option :value="null">Оберіть тип маркеру</option>
                <option :value="markerType.value" v-for="(markerType, index) of markerTypes" :key="index">
                    {{markerType.text}}
                </option>
            </b-form-select>
            <b-form-select v-model="filters.animalType" class="mb-3">
                <option :value="null">Оберіть вид тварини</option>
                <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                    {{animalType.text}}
                </option>
            </b-form-select>
            <b-form-select v-model="filters.animalBreed" class="mb-3">
                    <option :value="null">Оберіть породу тварини</option>
                    <option :value="animalBreed.value"
                            v-for="(animalBreed, index) of animalBreeds[filters.animalType]" :key="index">
                        {{animalBreed.text}}
                    </option>
                </b-form-select>
            <b-form-input v-model="filters.age" type="text" placeholder="Вік тварини" class="mb-3"></b-form-input>
            <b-form-select v-model="filters.color" class="mb-3">
                    <option :value="null">Оберіть колір тварини</option>
                    <option :value="animalColor.value"
                            v-for="(animalColor, index) of animalColors" :key="index">
                        {{animalColor.text}}
                    </option>
                </b-form-select>
                <div class="action-buttons">
                	<button type="button" class="btn btn-danger" @click="unsetFilters()">Скинути</button>
            		<button type="button" class="btn btn-primary" @click="applyMarkersFilter()">Застосувати</button>
                </div>
        
        </div>

    </div>
</template>

<script>
    import {MARKER_TYPES} from '../const/markerTypes.js';
    import {ANIMAL_TYPES} from '../const/animalTypes.js';
    import {ANIMAL_BREEDS} from '../const/animalBreeds.js';
    import {ANIMAL_COLORS} from '../const/animalColors.js';
    export default {
        name: 'main-menu',
        computed: {
            isCanAddMarker() {
                return this.$store.state.isCanAddMarker;
            }
        },
        methods: {
            activateMarkerAdding(type) {
                this.$store.dispatch('activateMarkerAdding', type);
            },
            applyMarkersFilter(){
                const filter = Object.assign({}, this.filters);
                Object.keys(filter).forEach(i => {
                    if (filter[i] == null) {
                        delete filter[i];
                    }
                });
                this.$store.dispatch('applyMarkersFilter', filter);
            },
            unsetFilters() {
            	Object.keys(this.filters).forEach(i => {
                    this.filters[i] = null
                });
                this.$store.dispatch('applyMarkersFilter', {});
            }
        },
        data() {
            return {
                markerTypes: MARKER_TYPES,
                animalTypes: ANIMAL_TYPES,
                animalBreeds: ANIMAL_BREEDS,
                animalColors: ANIMAL_COLORS,
                filters: {
                    type: null,
                    animalType: null,
                    age: null,
                    animalBreed: null,
                    color: null
                }
            }
        }
    }
</script>

<style lang="scss">
    .main-menu {
        // width: 280px;
        max-width: 240px;
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 997;
        background: white;
        padding: 8px;
        box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, .2);
        border-radius: 2px;
        .action-title {
            color: gray;
            font-size: 14px;
            margin-bottom: 12px;
        }
        .action-buttons {
            display: flex;
            justify-content: space-between;
        }
        .filters-block{
            padding-top: 12px;
        }
    }

</style>
