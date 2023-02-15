import Vue from 'vue';
import Vuex from 'vuex';
import createPersistencePlugin from './plugins/localCartStore';

Vue.use(Vuex);

const persistencePlugin = createPersistencePlugin();

export default new Vuex.Store({
    state: {
        productsInCart: [],
        filters: {},
        categoryFilter: [],
    },
    plugins: [persistencePlugin],
    getters: {
        getProductInCart: (state) => {
            return state.productsInCart
        },
        getNbProductsInCart: (state) => {
            return state.productsInCart.length
        },
        getQuantityOfProduct: (state) => (productId) => {
            const prodInCart = state.productsInCart.filter(product => product.id === productId);
            if (prodInCart.length > 0)
                return prodInCart[0].quantity;
            else
                return 0;
        },
        getCategoryFilter: (state) => {
            return state.categoryFilter;
        },
        getFilters: (state) => {
            return state.filters;
        }
    },
    mutations: {
        ADD_PRODUCT_IN_CART(state, product) {
            state.productsInCart.push(product);
        },
        REMOVE_PRODUCT_IN_CART(state, productId) {
            const productInCart = state.productsInCart.filter(prod => prod.id == productId)[0];
            const indexToDelete = state.productsInCart.indexOf(productInCart);
            if (indexToDelete !== -1)
                state.productsInCart.splice(indexToDelete, 1);
        },
        CHANGE_QUANTITY_OF_PRODUCT(state, { product, quantity }) {
            const productInCart = state.productsInCart.filter(prod => prod.id == product.id)[0];
            const indexOfProduct = state.productsInCart.indexOf(productInCart);
            if (indexOfProduct === -1) {
                this.commit("ADD_PRODUCT_IN_CART", { ...product, quantity: quantity });
            }
            else {
                const tmpList = state.productsInCart;
                tmpList[indexOfProduct].quantity = quantity;
                state.productsInCart = tmpList;
            }
        },
        GET_PRODUCT_IN_CART() { },
        SET_PRODUCT_IN_CART(state, products) {
            state.productsInCart = products;
        },
        SET_CATEGORY_FILTER(state, categories) {
            state.categoryFilter = categories;
        },
        CLEAR_CATEGORY_FILTER(state) {
            state.categoryFilter = [];
        },
        SET_FILTERS(state, filters) {
            state.filters = filters;
        },
    }
})