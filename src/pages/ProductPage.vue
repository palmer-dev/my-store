<template>
    <div>
        <top-bar :has-return="true" />
        <PreLoader v-if="pageIsLoading" />
        <div class="container">
            <div v-if="!pageIsLoading">
                <h1 class="has-text-centered is-size-1">{{ product.title }}</h1>
                <div class="columns is-mobile is-centered is-multiline px-4">
                    <div class="column  column is-half">
                        <figure class="image is-16by9">
                            <img :src="imageSelected" alt="" style="object-fit: contain; object-position: 50% 50%;">
                        </figure>
                    </div>
                    <div class="column is-full is-centered horizontal-scrollable">
                        <div class="columns">
                            <div class="column is-one-third" v-for="(image, index) in product.images" :key="image">
                                <figure class="image is-16by9" @click="() => { changeSelectedImage(index) }"
                                    :class="image == imageSelected ? 'is-selected-image' : 'is-not-selected-image'">
                                    <img :src="image" alt="" style="object-fit: contain;">
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="column is-full is-centered">
                        <div class="columns">
                            <div class="column">
                                <p class="is-size-6 pb-2">Référence : {{ product.id }} </p>
                                <p class="is-size-3"> Nom : {{ product.title }} </p>
                                <p class="is-size-6 pb-5">Marque : {{ product.brand }}</p>
                                <p class="is-size-5">Description : {{ product.description }}</p>
                            </div>
                            <div
                                class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                                <p class="is-size-3"> Prix : {{ getPriceFormated(product.price) }} </p>
                                <QuantitySelector :product="product" :is-alone="true" class="my-4" />
                                <p class="is-size-5"> Sous-total : {{ getPriceFormated(subTotalPrice) }}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TopBar from '@/components/TopBar.vue';
import QuantitySelector from '@/components/QuantitySelector.vue';
import PreLoader from '@/components/PreLoader.vue';

const fetchProduct = function (idProduct) {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://dummyjson.com/products/${idProduct}`)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    })
};

export default {
    name: "ProductPage",
    components: { TopBar, PreLoader, QuantitySelector },
    data() {
        return {
            product: null,
            indexImageSelected: 0,
        }
    },
    props: {
        productId: {
            type: String,
            default: "0"
        }
    },
    methods: {
        changeSelectedImage: function (newIndex) {
            this.indexImageSelected = newIndex;
        },
        getPriceFormated: (number) => {
            return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number)
        },
    },
    computed: {
        pageIsLoading: function () {
            if (this.product == null) return true
            else return false
        },
        imageSelected: function () {
            if (this.product.images?.length > 0)
                return this.product.images[this.indexImageSelected];
            else return "";
        },
        quantity: function () {
            return this.$store.getters.getQuantityOfProduct(this.product.id);
        },
        subTotalPrice: function () {
            return this.product.price * this.quantity;
        }
    },
    created() {
        fetchProduct(this.productId).then((response) => { this.product = response })
    },
};
</script>

<style scoped>
.is-selected-image {
    opacity: 1;
    cursor: default;
}

.is-not-selected-image {
    opacity: .5;
    cursor: pointer;
}

.horizontal-scrollable {
    overflow-x: scroll;
}

::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 10px;
}
</style>