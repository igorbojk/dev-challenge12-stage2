<template>
    <div class="main-menu">
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <button type="button" class="btn btn-success btn-block" v-b-toggle.markerBlock
                        v-b-popover.hover="'Додати маркер на мапу'" @click="resetAllFilters()">
                    Додати маркер
                </button>
            </b-card-header>
            <b-collapse id="markerBlock" visible accordion="actions">
                <div class="filters-block">
                    <div class="action-title">
                        Оберіть тип маркеру та клікніть на мапу щоб його встановити
                    </div>
                    <button type="button" class="btn btn-outline-danger btn-block" @click="deactivateMarkerAdding()"
                            v-if="isShowCancel()">Скасувати
                    </button>
                    <div class="action-buttons" v-if="isShowActionsButton()">
                        <button type="button" class="btn btn-outline-danger " @click="activateMarkerAdding('lost')"
                                :disabled="isCanAddMarker"
                                v-b-popover.hover="'Після натискання, клікніть на бажане місце на мапі щоб поставити маркер'">
                            Загублено
                        </button>
                        <button type="button" class="btn btn-outline-dark " @click="activateMarkerAdding('find')"
                                :disabled="isCanAddMarker"
                                v-b-popover.hover="'Після натискання, клікніть на бажане місце на мапі щоб поставити маркер'">
                            Знайдено
                        </button>
                    </div>
                </div>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <button type="button" class="btn btn-success btn-block" v-b-toggle.filterBlock
                        v-b-popover.hover="'Фільтрвати маркери за критеріями'" @click="resetAllFilters()">
                    Фільтрувати за критеріями
                </button>
            </b-card-header>
            <b-collapse id="filterBlock" accordion="actions">
                <div class="filters-block">
                    <div class="action-title">
                        Фільтрувати
                    </div>
                    <b-form-select v-model="filters.type" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по типу маркера'">
                        <option :value="null">Оберіть тип маркеру</option>
                        <option :value="markerType.value" v-for="(markerType, index) of markerTypes" :key="index">
                            {{markerType.text}}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="filters.animalType" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по виду тварини'">
                        <option :value="null">Оберіть вид тварини</option>
                        <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                            {{animalType.text}}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="filters.animalBreed" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по попроді тварини'">
                        <option :value="null">Оберіть породу тварини</option>
                        <option :value="animalBreed.value"
                                v-for="(animalBreed, index) of animalBreeds[filters.animalType]" :key="index">
                            {{animalBreed.text}}
                        </option>
                    </b-form-select>
                    <b-form-input v-model="filters.age" type="text" placeholder="Вік тварини" class="mb-3"
                                  v-b-popover.hover="'Фільтрувати по віку тварини'"></b-form-input>
                    <b-form-select v-model="filters.color" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по кольору тварини'">
                        <option :value="null">Оберіть колір тварини</option>
                        <option :value="animalColor.value"
                                v-for="(animalColor, index) of animalColors" :key="index">
                            {{animalColor.text}}
                        </option>
                    </b-form-select>
                    <div class="action-buttons">
                        <button type="button" class="btn btn-danger" @click="unsetFilters()" :disabled="isCanAddMarker"
                                v-b-popover.hover="'скинути всі фільтри'">
                            Скинути
                        </button>
                        <button type="button" class="btn btn-primary" @click="applyMarkersFilter()"
                                :disabled="isCanAddMarker" v-b-popover.hover="'Застосувати вибрані фільтри'">
                            Застосувати
                        </button>
                    </div>
                </div>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <button type="button" class="btn btn-success btn-block" v-b-toggle.radiusFilters
                        v-b-popover.hover="'Знайти співпадіння маркерів у радіусі'" @click="resetAllFilters()">
                    Пошук у радіусі
                </button>
            </b-card-header>
            <b-collapse id="radiusFilters" accordion="actions">
                <div class="filters-block">
                    <div class="action-title">
                        Натисніть "обрати центр" та клікніть на мапу щоб обрати центр радіуса.
                    </div>
                    <button type="button" class="btn btn-primary btn-block"
                            v-b-popover.hover="'Натисніть на мапу щоб обрати центр радіусу пошуку'"
                            @click="activateAddingCenter()">
                        Обрати центр
                    </button>
                    <b-form-input v-model="circleRadius" type="text" placeholder="Введіть радіус у метрах" class="mb-3"
                                  v-b-popover.hover="'Радіус кола фільтрації'"></b-form-input>
                    <b-form-select v-model="circleFilters.animalType" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по виду тварини'">
                        <option :value="null">Оберіть вид тварини</option>
                        <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                            {{animalType.text}}
                        </option>
                    </b-form-select>
                    <b-form-select v-model="circleFilters.animalBreed" class="mb-3"
                                   v-b-popover.hover="'Фільтрувати по попроді тварини'">
                        <option :value="null">Оберіть породу тварини</option>
                        <option :value="animalBreed.value"
                                v-for="(animalBreed, index) of animalBreeds[circleFilters.animalType]" :key="index">
                            {{animalBreed.text}}
                        </option>
                    </b-form-select>
                    <div class="action-buttons">
                        <button type="button" class="btn btn-danger" v-b-popover.hover="'скинути всі фільтри'" @click="resetAllFilters()">
                            Скинути
                        </button>
                        <button type="button" class="btn btn-primary" v-b-popover.hover="'Застосувати вибрані фільтри'"
                                @click="applyRadiusFilters()">
                            Застосувати
                        </button>
                    </div>
                </div>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import {gmapApi} from 'vue2-google-maps';
    import {MARKER_TYPES} from '../const/markerTypes.js';
    import {ANIMAL_TYPES} from '../const/animalTypes.js';
    import {ANIMAL_BREEDS} from '../const/animalBreeds.js';
    import {ANIMAL_COLORS} from '../const/animalColors.js';

    export default {
        name: 'main-menu',
        computed: {
            isCanAddMarker() {
                return this.$store.state.isCanAddMarker;
            },
            asideMode() {
                return this.$store.state.asideMode;
            },
            menuMode() {
                return this.$store.state.menuMode;
            },
            markers() {
                return this.$store.state.markers;
            },
            circleTest() {
                return this.$store.state.circle;
            },
            google: gmapApi,
        },
        methods: {
            isShowCancel() {
                return this.isCanAddMarker && !this.asideMode;
            },
            isShowActionsButton() {
                return !this.isCanAddMarker || this.asideMode;
            },
            activateMarkerAdding(type) {
                this.$store.dispatch('activateMarkerAdding', type);
            },
            applyMarkersFilter() {
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
            },
            deactivateMarkerAdding() {
                this.$store.dispatch('deactivateMarkerAdding');
            },
            changeMenuMode(mode) {
                this.$store.dispatch('changeMenuMode', mode)
            },
            activateAddingCenter() {
                this.$store.dispatch('activateAddingCenter');
            },
            applyRadiusFilters() {
                this.$store.dispatch('addCircleRadius', this.circleRadius);
                this.$store.dispatch('deactivateAddingCenter');
                const circleCenter = this.circleTest.center;
                const circleLat = new this.google.maps.LatLng(circleCenter.lat, circleCenter.lng);
                let filteredRadiusArray = [];
                this.markers.forEach(i => {
                    const markerPosition = i.position;
                    const markerLat = new this.google.maps.LatLng(markerPosition.lat, markerPosition.lng);
                    const distance = this.google.maps.geometry.spherical.computeDistanceBetween(markerLat, circleLat);
                    if (distance <= this.circleRadius) {
                        filteredRadiusArray.push(i)
                    }
                });
                this.$store.dispatch('filterInsideRadiusMarkers', {
                    array: filteredRadiusArray,
                    filters: this.circleFilters
                });
            },
            resetAllFilters(){
                this.$store.dispatch('resetAllFilters');
                Object.keys(this.filters).forEach(i => {
                    this.filters[i] = null
                });
                Object.keys(this.circleFilters).forEach(i => {
                    this.circleFilters[i] = null
                });
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
                },
                circleRadius: 0,
                circleFilters: {
                    animalType: null,
                    animalBreed: null
                }
            }
        }
    }
</script>

<style lang="scss">
    .main-menu {
        width: 250px;
        max-width: 250px;
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
        .filters-block {
            padding: 12px 4px;
        }
        .radius-filters {
            padding-top: 12px;
        }
        #radiusFilters {
            padding-top: 12px;
            button {
                margin-bottom: 12px;
            }
        }
    }

</style>
