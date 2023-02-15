<template>
    <div>
        <div class="card">
            <div class="card-image is-clickable" @click="redirectToProduct">
                <figure class="image is-16by9">
                    <img :src="product.thumbnail ?? 'https://bulma.io/images/placeholders/1280x960.png'"
                        style="object-fit: cover;" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content" @click="redirectToProduct">
                        <p class="title is-4 is-clickable">{{ product.title }}</p>
                        <div class="columns subtitle">
                            <p class="column subtitle is-6 mb-1">{{ product.id }}</p>
                            <p class="column subtitle is-6 has-text-right">{{ getPriceFormated(product.price) }}</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    {{ product.description ?? "Produit sympa !" }}
                </div>
            </div>
            <QuantitySelector :product="product" />
        </div>
    </div>
</template>

<script>
import QuantitySelector from './QuantitySelector.vue';
import priceMixin from '@/mixins/priceMixin';

export default {
    name: "CartProduct",
    mixins: [priceMixin],
    components: { QuantitySelector },
    props: {
        product: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        redirectToProduct: function () {
            this.$router.push({ name: 'product', params: { productId: this.product.id.toString() } })
        }
    }
}
</script>

<style scoped>
.card {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
}
</style>