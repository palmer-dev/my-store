<template>
    <div>
        <top-bar />
        <div class="container">
            <div class="filterBar">
                <div class="columns px-4 is-multiline">
                    <div class="field column is-half">
                        <div class="control is-medium" :class="isFilterContainLoading ? 'is-loading' : ''">
                            <input class="input is-medium" type="text" placeholder="Rechercher" v-model="filterContain">
                        </div>
                    </div>
                    <div class="field is-horizontal column is-half">
                        <div class="field-label is-medium">
                            <label class="label">Prix entre</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control is-medium">
                                    <input class="input is-medium" type="text" placeholder="MIN"
                                        v-model.number="priceMin" v-on:keypress="PositiveNumbersOnly">
                                </p>
                            </div>
                            <div class="field-label is-medium intermed">
                                <label class="label">et</label>
                            </div>
                            <div class="field">
                                <p class="control is-medium">
                                    <input class="input is-medium" type="text" placeholder="MAX"
                                        v-model.number="priceMax" v-on:keypress="PositiveNumbersOnly">
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- SECOND LINE -->
                    <div class="field column is-one-third">
                        <div class="select is-medium">
                            <select v-model="filterBrand">
                                <option value="" selected>Toutes les marques</option>
                                <option v-for="brand in allBrands" :key="brand" :value="brand">{{ brand }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="field column is-two-third">
                        <button class="button is-medium" @click="() => { updateModalStatus(true) }">Choisir des
                            catégories</button>
                    </div>
                </div>
            </div>
            <!-- CORPS DE LA PAGE -->
            <div class="columns is-multiline p-4">
                <cart-product v-for="prod in currentPageProducts" :key="prod.id" :product="prod"
                    class="column is-one-third" />
            </div>

            <!-- PAGINATION -->
            <nav class="pagination is-centered p-4" role="navigation" aria-label="pagination">
                <a class="pagination-previous" @click="currentPageIndex = currentPageIndex - 1"
                    v-if="currentPageIndex > 0">Précédent</a>
                <a class="pagination-next" @click="currentPageIndex = currentPageIndex + 1"
                    v-if="currentPageIndex < numberOfPages - 1">Suivant</a>
                <ul class="pagination-list">
                    <li v-for="pageIndex in numberOfPages" :key="pageIndex" @click="currentPageIndex = pageIndex - 1"><a
                            class="pagination-link" :class="{ 'is-current': currentPageIndex + 1 === pageIndex }"
                            :aria-label="'Goto page' + pageIndex">{{
                                pageIndex
                            }}</a></li>
                </ul>
            </nav>
        </div>
        <modal-category-selector :categories="categories" :is-modal-open-parent="modalCatOpen"
            @modalStatusChanged="updateModalStatus" />
    </div>
</template>

<script>
import axios from 'axios';
import TopBar from '../components/TopBar.vue'
import CartProduct from '../components/CardProduct.vue'
import ModalCategorySelector from '../components/ModalCategorySelector.vue'

const fetchProducts = function () {
    return new Promise((resolve, reject) => {
        axios
            .get('https://dummyjson.com/products?limit=0')
            .then((response) => resolve(response.data.products))
            .catch((error) => reject(error));
    })
};

const fetchCategories = function () {
    return new Promise((resolve, reject) => {
        axios
            .get('https://dummyjson.com/products/categories')
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    })
};


export default {
    name: "HomePage",
    components: { TopBar, CartProduct, ModalCategorySelector },
    data() {
        return {
            products: [],
            categories: [],
            isFilterContainLoading: false,
            filterContain: "",
            filterBrand: "",
            priceMin: null,
            priceMax: null,
            productPerPage: 10,
            currentPageIndex: 0,
            modalCatOpen: false,
        }
    },
    created() {
        fetchProducts().then((response) => { this.products = response });
        fetchCategories().then((response) => { this.categories = response });
        const sotredFilter = this.$store.getters.getFilters;
        this.filterContain = sotredFilter.filterContain ?? "";
        this.filterBrand = sotredFilter.filterBrand ?? "";
        this.priceMin = sotredFilter.priceMin ?? null;
        this.priceMax = sotredFilter.priceMax ?? null;
    },
    computed: {
        allProducts: function () {
            const filter = this.filterContain;
            const productsFirstFilter = this.products.filter(function (product) { return product.title?.toLowerCase().includes(filter.toLowerCase() ?? "") || product.description?.toLowerCase().includes(filter.toLowerCase() ?? "") })
            const productsFilteredPrice = productsFirstFilter.filter(product => (this.priceMin == null || this.priceMin == "" ? true : product.price >= this.priceMin) && (this.priceMax == null || this.priceMax == "" ? true : product.price <= this.priceMax));
            const productsFilteredBrand = productsFilteredPrice.filter(product => product.brand?.toLowerCase().includes(this.filterBrand.toLowerCase() ?? ""));
            if (this.filterCategory.length > 0)
                return productsFilteredBrand.filter(product => this.filterCategory.includes(product.category));
            else
                return productsFilteredBrand
        },
        numberOfPages: function () {
            if (!!this.allProducts && this.allProducts.length > 0) {
                const nbPage = Math.ceil(this.allProducts.length / this.productPerPage);
                if (this.currentPageIndex >= nbPage) {
                    this.resetCurrentIndexPage();
                }
                return nbPage
            }

            return 0;
        },
        itemsOffset: function () {
            return this.currentPageIndex * this.productPerPage;
        },
        currentPageProducts: function () {
            if (!!this.allProducts && this.allProducts.length > 0) {
                return this.allProducts.slice(
                    this.itemsOffset,
                    this.itemsOffset + this.productPerPage
                );
            }

            return [];
        },
        allBrands: function () {
            return [...new Set(this.products.map(prod => prod.brand))]
        },
        filterCategory: function () {
            return this.$store.getters.getCategoryFilter ?? [];
        }
    },
    methods: {
        resetCurrentIndexPage: function () {
            this.currentPageIndex = 0;
        },
        PositiveNumbersOnly(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        updateModalStatus: function (newStatusOpen) {
            this.modalCatOpen = newStatusOpen;
        },
        createFilterForStore: function () {
            return { filterContain: this.filterContain, filterBrand: this.filterBrand, priceMin: this.priceMin, priceMax: this.priceMax }
        }
    },
    watch: {
        filterContain: function () {
            this.$store.commit("SET_FILTERS", this.createFilterForStore());
        },
        filterBrand: function () {
            this.$store.commit("SET_FILTERS", this.createFilterForStore());
        },
        priceMin: function () {
            this.$store.commit("SET_FILTERS", this.createFilterForStore());
        },
        priceMax: function () {
            this.$store.commit("SET_FILTERS", this.createFilterForStore());
        }
    },
};
</script>

<style scoped>
.intermed {
    flex-grow: 0 !important;
}
</style>