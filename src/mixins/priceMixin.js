const priceMixin = {
    props: {
        product: {
            type: Object,
            default: () => { }
        }
    },
    computed: {
        quantity: function () {
            return this.$store.getters.getQuantityOfProduct(this.product.id);
        },
        subTotalPrice: function () {
            return this.product.price * this.quantity;
        }
    },
    methods: {
        getPriceFormated: (number) => {
            return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number)
        }

    }
}

export default priceMixin;