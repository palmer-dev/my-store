<template>
    <div>
        <top-bar />
        <h1 class="is-size-1 has-text-centered">Mon panier d'achat</h1>
        <div class="columns p-4 container">
            <div class="column columns is-multiline is-two-thirds">
                <div v-if="isEmpty"
                    class="emptyCart py-3 is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                    <p class="is-size-4 has-text-centered">Votre panier est vide !</p>
                    <p class="is-size-6">Allez donc voir le magasin pour peut-être trouver des perles rares!</p>
                    <br>
                    <router-link :to="{
                        name: 'home'
                    }">
                        <a>La boutique est par ici !</a>
                    </router-link>

                </div>
                <ProductInCart class="column is-full" v-for="product in productsInCart" :product="product"
                    :key="product.id" />
            </div>
            <div class="column">
                <div class="card totalCard">
                    <header class="card-header">
                        <p class="card-header-title">
                            TOTAL
                        </p>
                        <p class="card-header-icon">
                            {{ getPriceFormated(totalPrice) }}
                        </p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </header>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import ProductInCart from '@/components/ProductInCart.vue';
import priceMixin from '@/mixins/priceMixin';

export default {
    name: "CartPage",
    mixins: [priceMixin],
    components: { TopBar, ProductInCart },
    computed: {
        productsInCart: function () {
            return this.$store.getters.getProductInCart;
        },
        totalPrice: function () {
            let preTotal = 0;
            this.productsInCart.forEach(prod => {
                preTotal += prod.price * prod.quantity;
            });
            return preTotal;
        },
        isEmpty: function () {
            return !(this.productsInCart?.length > 0);
        }
    }
};
</script>

<style scoped>
.totalCard {
    position: sticky;
    top: 20px
}

.emptyCart {
    width: 100%;
    background: rgb(238, 238, 238);
    border-radius: 0.25rem;
    min-height: 100px;
}
</style>