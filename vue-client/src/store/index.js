import Vue from 'vue'
import Vuex from 'vuex'
import { ComicViewerApi } from '../api/comicViewer'
const comicViewerApi = new ComicViewerApi();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        comicInfo: {
            month: '',
            num: 1,
            link: '',
            year: '',
            news: '',
            safe_title: '',
            transcript: '',
            alt: '',
            img: '',
            title: '',
            day: ''
        },
        isLoading: true
    },
    getters: {
        getComicInfo(state) {
            return state.comicInfo;
        },
        getIsLoading(state) {
            return state.isLoading;
        }
    },
    mutations: {
        setComicInfo(state, payload) {
            state.comicInfo = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
    },
    actions: {
        updateComicInfo({ commit }, payload) {
            commit('setIsLoading', true);
            comicViewerApi.getxkdc(payload)
            .then(response => {
                commit('setComicInfo', response.data)
            })
            .catch(e => {
                commit('setComicInfo', {
                    month: '',
                    num: '',
                    link: '',
                    year: '',
                    news: '',
                    safe_title: '',
                    transcript: '',
                    alt: '',
                    img: '',
                    title: '',
                    day: ''
                });
            })
            .finally(() => {
                commit('setIsLoading', false);
            })
        }
    },
    modules: {
    }
});
