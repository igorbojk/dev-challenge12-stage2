import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isCanAddMarker: false
    },
    mutations: {
        toggleAddMarker(state) {
            state.isCanAddMarker = !state.isCanAddMarker;
        },
    },
    actions: {
        toggleAddMarker({commit}) {
            commit('toggleAddMarker')
        },
    },
});