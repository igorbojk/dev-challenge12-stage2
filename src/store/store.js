import Vue from 'vue';
import Vuex from 'vuex';
import VueLocalStorage from 'vue-ls';

var filter = require('lodash.filter');
Vue.use(Vuex);

const options = {
    namespace: 'dev_challenge__'
};

Vue.use(VueLocalStorage, options);


const defaultData = [
    {
        type: 'lost',
        age: "42",
        animalBreed: "Australian Shepherd",
        animalType: "dog",
        color: "red",
        contactInfo: "2212",
        icon: {
            url: "icons/lost_icon.png"
        },
        id: "_wwkq11fcj",
        photoUrl: "https://s00.yaplakal.com/pics/pics_original/4/5/5/11106554.jpg",
        position: {
            lat: 50.98681178914668,
            lng: 31.64168714699099
        }
    }
];
export const store = new Vuex.Store({
    state: {
        markers: [],
        filteredMarkers: [],
        currentMarker: null,
        isCanAddMarker: false,
        openAside: false,
        asideMode: null,
        menuMode: 'default',
        isCanAddCenter: false,
        circle: {
            center: null,
            radius: 0
        }
    },
    mutations: {
        activateMarkerAdding(state, type) {
            state.openAside = false;
            state.isCanAddMarker = true;
            state.asideMode = null;
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
            state.filteredMarkers = state.filteredMarkers.filter(i => i.id !== state.currentMarker.id);
        },
        setAsideMode(state, mode) {
            state.asideMode = mode;
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
                Vue.ls.set('data', defaultData);
            }
            store.markers = Vue.ls.get('data');
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
        }
    },
    actions: {
        addNewMarker({commit}, type) {
            commit('addNewMarker', type)
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
        setAsideMode({commit}, mode) {
            commit('setAsideMode', mode);
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
        }
    },
});