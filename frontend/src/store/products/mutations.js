export default {
    ALL_PRODUCTS(state, payload) {
        state.products = payload
    },
    PRODUCT(state, payload) {
        state.product = payload
    },
    PRODUCT_BY_ID(state, payload) {
        state.productById = payload
    }
}