import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import article from "./modules/article";

export default new Vuex.Store({
    state: {
        isLoading: false,
        token: '',
    },
    modules: {
        article        
    }
})