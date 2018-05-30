<template>
    <div class="toast-container" v-bind:class="{'active': dismissCountDown}">
        <b-alert  :show="dismissCountDown"
                 dismissible
                 variant="dark"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">{{toastText}}</b-alert>
    </div>
</template>

<script>
    export default {
        name: "toast-component",
        mounted(){
            this.$root.$on('showToast', (toastText) => {
                this.showAlert();
                this.toastText = toastText;

            });
        },
        data () {
            return {
                dismissSecs: 3,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                toastText: null
            }
        },
        methods: {
            countDownChanged (dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs
            }
        }
    }
</script>

<style scoped lang="scss">
    .toast-container{
        position: fixed;
        left: 16px;
        bottom: 16px;
        z-index: 1000;
        padding: 16px;
        opacity: 0;
        transition: all .3s;
        &.active{
            opacity: 1;
        }
        .alert{
            font-size: 24px;
            min-width: 320px;
        }
    }
</style>