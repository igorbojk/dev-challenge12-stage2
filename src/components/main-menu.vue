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
            <button type="button" class="btn btn-primary btn-block" @click="applyMarkersFilter()">Застосувати фільтр</button>
            <button type="button" class="btn btn-primary btn-block" @click="unsetFilters()">Скинути фільтр</button>
        </div>

    </div>
</template>

<script>
    import {MARKER_TYPES} from '../const/markerTypes.js';
    import {ANIMAL_TYPES} from '../const/animalTypes.js';
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
                this.filters = {
                    type: null,
                    animalType: null
                };
                this.$store.dispatch('applyMarkersFilter', {});
            }
        },
        data() {
            return {
                markerTypes: MARKER_TYPES,
                animalTypes: ANIMAL_TYPES,
                filters: {
                    type: null,
                    animalType: null
                }
            }
        }
    }
</script>

<style lang="scss">
    .main-menu {
        // width: 280px;
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
            button:first-child {
                margin-right: 16px;
            }
        }
        .filters-block{
            padding-top: 12px;
        }
    }

</style>
