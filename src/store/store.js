import Vue from 'vue';
import Vuex from 'vuex';
var filter = require('lodash.filter');
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        markers: [],
        filteredMarkers: [],
        currentMarker: null,
        isCanAddMarker: false,
        openAside: false,
        asideMode: null
    },
    mutations: {
        activateMarkerAdding(state, type) {
            state.isCanAddMarker = true;
            state.currentMarker = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                type: type,
                icon: {
                    url: `icons/${type}_icon.png`,
                }
            };
        },
        diactivateMarkerAdding(state) {
            state.isCanAddMarker = false;
        },
        addNewMarker(state, position) {
            state.currentMarker.position = {
                lat: position.lat,
                lng: position.lng
            };
            state.markers.push(state.currentMarker);
            state.filteredMarkers = state.markers;
            state.asideMode = 'edit';
            state.openAside = true;
        },
        closeAside(state) {
            state.openAside = false;
            state.currentMarker = null;
            state.asideMode = null;
        },
        openAside(state) {
            state.openAside = true;
        },
        setCurrentMarker(state, marker) {
            state.currentMarker = marker;
        },
        saveMarker(state, markerOptions) {
            const oldMarker = state.markers.find(i => i.id == state.currentMarker.id);
            Object.assign(oldMarker, markerOptions);
            state.currentMarker = null;
        },
        cancelMarkerAdding(state) {
            state.markers = state.markers.filter(i => i.id !== state.currentMarker.id);
        },
        setAsideMode(state, mode) {
            state.asideMode = mode;
        },
        setMarkers(state) {
            state.filteredMarkers = state.markers;
        },
        applyMarkersFilter(state, filters){
            state.filteredMarkers = filter(state.markers, filters);
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
        },
        saveMarker({commit}, markerOptions) {
            commit('saveMarker', markerOptions);
        },
        cancelMarkerAdding({commit}) {
            commit('cancelMarkerAdding');
        },
        setAsideMode({commit}, mode) {
            commit('setAsideMode', mode);
        },
        setMarkers({commit}) {
            commit('setMarkers');
        },
        applyMarkersFilter({commit}, filters){
            commit('applyMarkersFilter', filters);
        }
    },
});