<template>
    <div class="p-5">
        <div class="columns is-bordered">
            <div class="column is-clickable" @click="redirectToProduct">
                <figure class="image is-16by9" style="width: auto">
                    <img class="has-ratio" height="200"
                        :src="product.thumbnail ?? 'https://bulma.io/images/placeholders/1280x960.png'"
                        style="object-fit: cover;" alt="Placeholder image">
                </figure>
            </div>
            <div class="column">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">Nom : {{ product.title }}</p>
                        <p class="subtitle is-6">Ref. : {{ product.id }}</p>
                    </div>
                </div>
            </div>
            <div class="column is-flex is-flex-direction-column is-flex-justify-content-center is-align-items-center">
                <p class="column is-6 has-text-centered">{{ getPriceFormated(product.price) }}</p>
                <QuantitySelector :product="product" :is-alone="true" />
                <p class="column is-6 has-text-centered">{{ getPriceFormated(subTotalPrice) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import QuantitySelector from './QuantitySelector.vue';
import priceMixin from '@/mixins/priceMixin';

export default {
    name: "ProductInCart",
    mixins: [priceMixin],
    components: { QuantitySelector },
    methods: {
        redirectToProduct: function () {
            this.$router.push({ name: 'product', params: { productId: this.product.id } })
        }
    }
}
</script>

<style scoped>
.is-bordered {
    border-radius: 0.25rem;
    border: solid 1px gainsboro;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}
</style>