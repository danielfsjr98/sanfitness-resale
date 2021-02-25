export default {
    SALE(state, payload) {
        state.sale = payload
    },
    SALE_ITEM(state, payload) {
        state.saleItem = payload
    },
    CART(state, payload) {
        state.cart = payload
    },
    MY_SALES(state, payload) {
        state.mySales = payload
    },
    ALL_SALES(state, payload) {
        state.allSales = payload
    },
    SALES_ITEMS_BY_SALE_ID(state, payload) {
        state.salesItemsBySaleId = payload
    }
}