<template>
    <div>
        <div class="card-footer" :class="{ 'all-border': isAlone }">
            <a v-if="quantity > 0" href="#" @click="removeProduct" class="card-footer-item"><font-awesome-icon
                    icon="fa-solid fa-minus" size="xl" /></a>
            <div class="card-footer-item">
                <input type="text" class="input has-no-border" name="quantityProd" id="" :value="quantity"
                    @change="quantityChange" v-on:keypress="PositiveNumbersOnly">
            </div>
            <a href="#" @click="addProduct" class="card-footer-item"><font-awesome-icon icon="fa-solid fa-plus"
                    size="xl" /></a>
        </div>
    </div>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';

export default {
    name: "QuantitySelector",
    mixins: [priceMixin],
    props: {
        isAlone: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        PositiveNumbersOnly(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        createProductForStore: function (quantity) {
            return { id: this.product.id, title: this.product.title, thumbnail: this.product.thumbnail, price: this.product.price, quantity: quantity }
        },
        createPayLoadForStore: function (quantityProd, quantity) {
            const product = this.createProductForStore(quantityProd);
            return { product, quantity }
        },
        addProduct: function () {
            const localQuantity = this.quantity + 1
            this.$store.commit("CHANGE_QUANTITY_OF_PRODUCT", this.createPayLoadForStore(this.quantity, localQuantity));
        },
        removeProduct: function () {
            const localQuantity = this.quantity - 1;
            if (localQuantity > 0) {
                this.$store.commit("CHANGE_QUANTITY_OF_PRODUCT", this.createPayLoadForStore(this.quantity, localQuantity));
            }
            else
                this.$store.commit("REMOVE_PRODUCT_IN_CART", this.product.id);
        },
        quantityChange: function (evt) {
            const localQuantity = evt.target.value
            if (localQuantity > 0 && localQuantity.match(/[0-9]/g)) {
                this.$store.commit("CHANGE_QUANTITY_OF_PRODUCT", this.createPayLoadForStore(this.quantity, parseInt(localQuantity)));
            }
        }
    },

};
</script>

<style scoped>
.has-no-border {
    border: none !important;
    box-shadow: none;
    text-align: center !important;
    ;
}

.all-border {
    border: 1px solid gainsboro !important;
}
</style>