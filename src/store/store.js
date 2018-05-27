import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        markers: [],
        currentMarker: null,
        currentMarkerType: null,
        isCanAddMarker: false,
        openAside: false
    },
    mutations: {
        activateMarkerAdding(state, type){
            state.isCanAddMarker = true,
            state.currentMarkerType = type;
        },
        diactivateMarkerAdding(state){
            state.isCanAddMarker = false,
            state.currentMarkerType = null;
        },
        addNewMarker(state, position) {
            state.currentMarker = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                type: state.currentMarkerType,
                position: {
                  lat: position.lat,
                  lng: position.lng
                },
                icon: {
                  url: `icons/${state.currentMarkerType}_icon.png`,
                }
              }
            state.markers.push(state.currentMarker);
            state.openAside = true;
        },
        closeAside(state) {
            state.openAside = false;
        },
        openAside(state) {
            state.openAside = true;
        },
        setCurrentMarker(state, marker){
            state.currentMarker = marker;
        }
    },
    actions: {
        addNewMarker({commit}, type) {
            commit('addNewMarker', type)
        },
        activateMarkerAdding({commit}, type) {
            commit('activateMarkerAdding', type);
        },
        diactivateMarkerAdding({commit}) {
            commit('diactivateMarkerAdding');
        },
        closeAside({commit}) {
            commit('closeAside');
        },
        openAside({commit}) {
            commit('openAside');
        },
        setCurrentMarker({commit}, marker) {
            commit('setCurrentMarker', marker);
        }
    },
});