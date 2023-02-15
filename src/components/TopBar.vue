<template>
    <div class="columns px-3">
        <div class="column is-flex is-justify-content-flex-start is-align-items-center">
            <p class="is-clickable" @click="backOne" v-if="hasReturn">
                &#60; <u>Retour</u>
            </p>
        </div>
        <div class="column is-flex is-justify-content-center is-align-items-center">
            <router-link :to="{
                name: 'home'
            }">
                <img src="../assets/logo-my-store.svg" alt="LOGO MY STORE" style="width: 128px">
            </router-link>
        </div>
        <div class="column is-flex is-justify-content-flex-end is-align-items-center">
            <div class="is-relative">
                <router-link :to="{
                    name: 'cart'
                }">
                    <div v-if="numberProductsInCart > 0" class="badge is-size-7">{{ numberProductsInCart }}</div>
                    <font-awesome-icon style="color:black" icon="fa-solid fa-cart-shopping" size="xl" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    props: {
        hasReturn: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        numberProductsInCart: function () {
            return this.$store.getters.getNbProductsInCart;
        }
    },
    methods: {
        backOne: function () {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
.badge {
    background-color: crimson;
    color: white;
    min-height: fit-content;
    padding: .2rem;
    aspect-ratio: 1/1;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -40%;
    right: -30%;
}
</style>