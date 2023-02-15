<template>
    <div>
        <div class="modal" :class="{ 'is-active': isModalOpen }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close" @click="isModalOpen = false"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <div class="columns is-multiline is-narrow is-centered">
                        <label class="checkbox column is-narrow" v-for="cat in categories" :key="cat">
                            <input type="checkbox" name="category" :value="cat" style="display: none;"
                                :checked="categoryInFilter.includes(cat)" />
                            {{ cat }}
                        </label>
                    </div>
                </section>
                <footer class="modal-card-foot is-flex is-justify-content-flex-end">
                    <button class="button is-success" @click="clearAllCategories">Clear</button>
                    <button class="button is-success" @click="saveCategorySelected">Enregistrer</button>
                </footer>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="isModalOpen = false"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalCategorySelector",
    data() {
        return {
            isModalOpen: false
        }
    },
    props: {
        categories: {
            type: Array,
            default: () => []
        },
        isModalOpenParent: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        categoryInFilter: function () {
            return this.$store.getters.getCategoryFilter;
        }
    },
    methods: {
        saveCategorySelected: function () {
            const catSelected = [...document.querySelectorAll('input[name=category]:checked')].map(cat => cat.value)
            this.$store.commit("SET_CATEGORY_FILTER", catSelected);
            this.isModalOpen = false;
        },
        clearAllCategories: function () {
            this.$store.commit("CLEAR_CATEGORY_FILTER");
            this.isModalOpen = false;
        }
    },
    watch: {
        isModalOpenParent: function (newStatusOpen) {
            this.isModalOpen = newStatusOpen;
        },
        isModalOpen: function (newStatusOpen) {
            this.$emit("modalStatusChanged", newStatusOpen);
        }
    }
}
</script>

<style scoped>
.checkbox {
    background-color: rgb(242, 242, 242);
    /* padding: 1rem; */
    margin: 0.25rem;
    border-radius: 100px;
}

.checkbox:has(>input:checked) {
    background-color: grey;
    color: white
}
</style>