import Vue from 'vue';
import Vuex from 'vuex';
import VueLocalStorage from 'vue-ls';
import {MARKERS} from '../const/defaultData';
import {SETTINGS} from '../const/defaultData'

var filter = require('lodash.filter');
Vue.use(Vuex);

const options = {
    namespace: 'dev_challenge__'
};

const defaulMarkers = MARKERS;
const defaultSettings = SETTINGS;

Vue.use(VueLocalStorage, options);

export const store = new Vuex.Store({
    state: {
        markers: [],
        filteredMarkers: [],
        currentMarker: null,
        isCanAddMarker: false,
        openAside: false,
        menuMode: 'default',
        isCanAddCenter: false,
        circle: {
            center: null,
            radius: 0
        },
        isOpenSettings: false,
        settings: {}
    },
    mutations: {
        activateMarkerAdding(state, type) {
            state.openAside = false;
            state.isCanAddMarker = true;
            state.currentMarker = {
                id: '_' + Math.random().toString(36).substr(2, 9),
                type: type,
                icon: {
                    url: `icons/${type}_icon.png`,
                }
            };
        },
        deactivateMarkerAdding(state) {
            state.isCanAddMarker = false;
        },
        addNewMarker(state, position) {
            state.currentMarker.position = {
                lat: position.lat,
                lng: position.lng
            };
            state.markers.push(state.currentMarker);
            state.filteredMarkers = state.markers;
        },
        closeAside(state) {
            state.openAside = false;
            state.currentMarker = null;
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
            state.filteredMarkers = state.filteredMarkers.filter(i => i.id !== state.currentMarker.id);
        },
        setMarkers(state) {
            state.filteredMarkers = state.markers;
        },
        applyMarkersFilter(state, filters) {
            state.filteredMarkers = filter(state.markers, filters);
        },
        deleteMarker(state) {
            state.markers = state.markers.filter(i => i.id !== state.currentMarker.id);
            state.filteredMarkers = state.filteredMarkers.filter(i => i.id !== state.currentMarker.id);
        },
        getData(store) {
            if (!Vue.ls.get('data')) {
                Vue.ls.set('data', defaulMarkers);
            }
            store.markers = Vue.ls.get('data');

            if (!Vue.ls.get('settings')) {
                Vue.ls.set('settings', defaultSettings);
            }
            store.settings = Vue.ls.get('settings');
        },
        saveData(store) {
            Vue.ls.set('data', store.markers);
        },
        changeMenuMode(state, mode) {
            state.menuMode = mode;
        },
        activateAddingCenter(state) {
            state.isCanAddCenter = true;
        },
        deactivateAddingCenter(state) {
            state.isCanAddCenter = false;
        },
        addCircleCenter(state, center) {
            state.circle.center = center;
        },
        addCircleRadius(state, radius){
            state.circle.radius = +radius;
        },
        filterInsideRadiusMarkers(state, props) {
            state.filteredMarkers = filter(props.array, props.filters);
        },
        resetAllFilters(state) {
            state.filteredMarkers = state.markers;
            state.circle.radius = 0;
            state.circle.center = null;
            state.isCanAddMarker = false;
        },
        toggleOpenSettings(state){
            state.isOpenSettings = !state.isOpenSettings;
        },
        addNewColor(state, color) {
            state.settings.ANIMAL_COLORS.push(color);
            state.settings.TRANSLATES.ANIMAL_COLORS[color.value] = color.text;
            Vue.ls.set('settings', state.settings);
        },
        addNewType(state, type) {
            state.settings.ANIMAL_TYPES.push(type);
            state.settings.ANIMAL_BREEDS[type.value] = [];
            state.settings.TRANSLATES.ANIMAL_TYPES[type.value] = type.text;
            Vue.ls.set('settings', state.settings);
        },
        addNewBreed(state, payload){
            state.settings.ANIMAL_BREEDS[payload.type].push(payload.breed);
            state.settings.TRANSLATES.BREEDS[payload.type][payload.breed.value] = payload.breed.text;
            Vue.ls.set('settings', state.settings);
        }
    },
    actions: {
        addNewMarker({commit}, position) {
            commit('addNewMarker', position)
        },
        activateMarkerAdding({commit}, type) {
            commit('activateMarkerAdding', type);
        },
        deactivateMarkerAdding({commit}) {
            commit('deactivateMarkerAdding');
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
            commit('saveData');
        },
        cancelMarkerAdding({commit}) {
            commit('cancelMarkerAdding');
        },
        setMarkers({commit}) {
            commit('setMarkers');
        },
        applyMarkersFilter({commit}, filters) {
            commit('applyMarkersFilter', filters);
        },
        deleteMarker({commit}) {
            commit('deleteMarker');
            commit('saveData');
            commit('closeAside');
        },
        getData({commit}) {
            commit('getData');
        },
        setData({commit}) {
            commit('saveData');
        },
        changeMenuMode({commit}, mode) {
            commit('changeMenuMode', mode);
        },
        activateAddingCenter({commit}) {
            commit('activateAddingCenter');
        },
        deactivateAddingCenter({commit}) {
            commit('deactivateAddingCenter');
        },
        addCircleCenter({commit}, center) {
            commit('addCircleCenter', center);
        },
        addCircleRadius({commit}, radius) {
            commit('addCircleRadius', radius);
        },
        filterInsideRadiusMarkers({commit}, props) {
            commit('filterInsideRadiusMarkers', props);
        },
        resetAllFilters({commit}) {
            commit('resetAllFilters');
        },
        toggleOpenSettings({commit}){
            commit('toggleOpenSettings');
        },
        addNewColor({commit}, color) {
            commit('addNewColor', color);
        },
        addNewType({commit}, type){
            commit('addNewType', type);
        },
        addNewBreed({commit}, payload){
            commit('addNewBreed', payload)
        }
    },
});