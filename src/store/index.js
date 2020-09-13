import Vue from 'vue';
import Vuex from 'vuex';
import {undoRedoPlugin} from '../helpers';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {},
    plugins: [undoRedoPlugin],
});

