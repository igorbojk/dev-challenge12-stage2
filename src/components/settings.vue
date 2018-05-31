<template>
    <section class="settings" v-bind:class="{active: isOpenSettings}">
        <div class="close-btn" @click="toggleOpenSettings()"></div>
        <div class="container">
            <h1>Редагування переліківи тварин, порід, кольорів</h1>
            <b-tabs>
                <b-tab title="Види тварин" active>
                    <p v-for="(type, index) in animalTypes" :key="index" v-if="animalTypes">
                        {{type.text}}
                    </p>
                </b-tab>
                <b-tab title="Породи тварин">
                    <ul>
                        <li v-for="(breeds, animal) in animalBreeds" :key="animal" v-if="animalBreeds">
                            {{TRANSLATES.ANIMAL_TYPES[animal]}}
                            <ul>
                                <li v-for="(breed, index) in breeds" :key="index">
                                    {{breed.text}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </b-tab>
                <b-tab title="Кольори">
                    <p v-for="(color, index) in animalColors" :key="index" v-if="animalColors">
                        {{color.text}}
                    </p>
                </b-tab>
            </b-tabs>
        </div>


    </section>
</template>

<script>
    import {TRANSLATES} from '../const/translates.js';
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
            }
        },
        methods: {
            toggleOpenSettings() {
                this.$store.dispatch('toggleOpenSettings');
            }
        },
        data(){
            return {
                TRANSLATES: TRANSLATES,
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
        .container{
            margin-top: 16px;
            h1{
                margin-bottom: 48px;
            }
        }
        .tab-pane{
            margin-top: 48px;
        }
    }
</style>