const article = {
    namespaced: true,
    state: {
        id: -1,
        articles: [],
        article: {},
    },
    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        ADD_ARTICLE: (state, payload) => {
            state.article = payload;
        },
        ADD_ARTICLES: (state, payload) => {
            state.articles = payload;
        }
    },
    actions: {
        get_data({commit}, id){
            commit('SET_ID', parseInt(id));

            let uri = `/api/article/detail/${id}`;
            axios.get(uri, this.article).then((response) => {
                commit('ADD_ARTICLE', response.data);
            });
        },
        get_datas({commit}) {
            let uri = 'api/articles';
            axios.get(uri).then(response => {
                commit('ADD_ARTICLES', response.data);
            })
        },
    }
}

export default article;