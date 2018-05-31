<template>
    <div id="app">
        <main-menu></main-menu>
        <main-map></main-map>
        <aside-menu></aside-menu>
        <marker-create-modal></marker-create-modal>
        <toast-component></toast-component>
        <settings></settings>
    </div>
</template>

<script>
    import MainMap from './components/main-map';
    import AsideMenu from './components/aside-menu';
    import MainMenu from './components/main-menu';
    import MarkerCreateModal from "./components/marker-create-modal";
    import ToastComponent from "./components/toast-component";
    import Settings from "./components/settings";

    export default {

        name: 'app',
        components: {
            MarkerCreateModal,
            MainMenu,
            MainMap,
            AsideMenu,
            ToastComponent,
            Settings
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
