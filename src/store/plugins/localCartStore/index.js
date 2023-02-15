const retrieveLocalCart = () => {
    return JSON.parse(localStorage.getItem("localCart") || "[]");
}

const storeLocalCart = (cart) => {
    localStorage.setItem("localCart", JSON.stringify(cart));
}

const toLook = ["ADD_PRODUCT_IN_CART", "REMOVE_PRODUCT_IN_CART", "CHANGE_QUANTITY_OF_PRODUCT"];

export default function createPersistencePlugin() {
    return (store) => {
        store.subscribe((mutation, state) => {
            if (mutation.type === "GET_PRODUCT_IN_CART") {
                const cart = retrieveLocalCart();
                store.commit("SET_PRODUCT_IN_CART", cart);
            } else if (toLook.includes(mutation.type)) {
                storeLocalCart(state.productsInCart);
            }
        });
    }
}