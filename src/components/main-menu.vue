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
    </div>
</template>

<script>
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
            }
        },
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
    }

</style>
