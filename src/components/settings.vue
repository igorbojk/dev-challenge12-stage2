<template>
    <section class="settings" v-bind:class="{active: isOpenSettings}">
        <div class="close-btn" @click="toggleOpenSettings()"></div>
        <div class="container">
            <b-tabs>
                <b-tab title="Види тварин" active>
                    <ul v-if="animalTypes">
                        <li v-for="(type, index) in animalTypes" :key="index" >
                            {{type.text}}
                        </li>
                    </ul>
                    <b-form-input v-model="newType" type="text" placeholder="Додати колір" class="mb-3"></b-form-input>
                    <button type="button" class="btn btn-outline-primary btn-block" @click="addNewType()">Додати</button>
                </b-tab>
                <b-tab title="Породи тварин">
                    <ul  v-if="animalBreeds">
                        <li v-for="(breeds, animal) in animalBreeds" :key="animal">
                            {{translates.ANIMAL_TYPES[animal]}}
                            <ul>
                                <li v-for="(breed, index) in breeds" :key="index">
                                    {{breed.text}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <b-form-select v-model="animalType" class="mb-3" required v-if="animalTypes">
                        <option :value="null">Оберіть вид тварини</option>
                        <option :value="animalType.value" v-for="(animalType, index) of animalTypes" :key="index">
                            {{animalType.text}}
                        </option>
                    </b-form-select>
                    <b-form-input v-model="newBreed" type="text" placeholder="Додати породу" class="mb-3"></b-form-input>
                    <button type="button" class="btn btn-outline-primary btn-block" @click="addNewBreed()">Додати</button>
                </b-tab>
                <b-tab title="Кольори">
                    <ul v-if="animalColors">
                        <li v-for="(color, index) in animalColors" :key="index">
                            {{color.text}}
                        </li>
                    </ul>
                    <b-form-input v-model="newColor" type="text" placeholder="Додати колір" class="mb-3"></b-form-input>
                    <button type="button" class="btn btn-outline-primary btn-block" @click="addNewColor()">Додати</button>

                </b-tab>
            </b-tabs>
        </div>


    </section>
</template>

<script>
    export default {
        name: "settings",
        computed: {
            isOpenSettings() {
                return this.$store.state.isOpenSettings;
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
            toggleOpenSettings() {
                this.$store.dispatch('toggleOpenSettings');
            },
            addNewColor() {
                const color = {
                    value: '_' + Math.random().toString(36).substr(2, 9),
                    text: this.newColor
                };
                this.$store.dispatch('addNewColor', color);
                this.newColor = null;
            },
            addNewType() {
                const newType = {
                    value: '_' + Math.random().toString(36).substr(2, 9),
                    text: this.newType
                };
                this.$store.dispatch('addNewType', newType);
                this.newType = null;
            },
            addNewBreed() {
                const newBreed = {
                    value: '_' + Math.random().toString(36).substr(2, 9),
                    text: this.newBreed
                };
                this.$store.dispatch('addNewBreed', {breed: newBreed, type: this.animalType});
                this.newBreed = null;
                this.animalType = null;
            }
        },
        data() {
            return {
                newColor: null,
                newType: null,
                animalType: null,
                newBreed: null
            }
        }
    }
</script>

<style lang="scss">
    .settings {
        position: fixed;
        z-index: 1001;
        height: 100vh;
        top: -100vh;
        right: 0;
        left: 0;
        transition: top .6s;
        background: white;
        &.active {
            top: 0;
        }
        .close-btn {
            width: 48px;
            height: 48px;
            position: absolute;
            right: 16px;
            top: 16px;
            transition: all .3s;
            &:before,
            &:after {
                content: '';
                position: absolute;
                width: 3px;
                height: 48px;
                right: 50%;
                transform-origin: center;
                background: black;

            }
            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
            &:hover {
                cursor: pointer;
                transform: rotate(180deg);
            }
        }
        .container {
            margin-top: 16px;
            h1 {
                margin-bottom: 48px;
            }
        }
        .tab-pane {
            margin-top: 48px;
        }
    }
</style>