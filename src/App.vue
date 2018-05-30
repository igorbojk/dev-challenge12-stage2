<template>
    <div id="app">
        <main-menu></main-menu>
        <main-map></main-map>
        <aside-menu></aside-menu>
        <marker-create-modal></marker-create-modal>
    </div>
</template>

<script>
    import MainMap from './components/main-map.vue';
    import AsideMenu from './components/aside-menu.vue';
    import MainMenu from './components/main-menu.vue';
    import MarkerCreateModal from "./components/marker-create-modal";

    export default {

        name: 'app',
        components: {
            MarkerCreateModal,
            MainMenu,
            MainMap,
            AsideMenu
        }
    }
</script>

<style lang="scss">
    #app {
        display: flex;
        height: 100vh;
        position: relative;

        .btn:disabled {
            opacity: 0.2;
        }

    }
</style>
