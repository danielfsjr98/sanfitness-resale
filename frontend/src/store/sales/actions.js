import api from 'axios'
import { baseApiUrl, showError, showSuccess, cartKey } from '@/global'
import store from '@/store'

export default {
    async setSale({ commit }, _payload) {
        await api.post(`${baseApiUrl}/sales`, _payload)
            .then(res => {
                commit("SALE", res.data);
                showSuccess("Pedido enviado com sucesso!")
            })
            .catch(showError)
    },
    setProductToCart({ commit }, _payload) {
        const userId = store.getters['Auth/getUser'].id
        let cart = localStorage.getItem(cartKey) ? JSON.parse(localStorage.getItem(cartKey)) : []

        if(cart.length > 0) {
            cart = cart[0].userId !== userId ? cart = [] : cart
        }

        if(_payload){
            _payload.userId = userId
            cart.push(_payload)
            showSuccess("Produto adicionado ao carrinho!")
        }
        commit("CART", cart);
        localStorage.setItem(cartKey, JSON.stringify(cart))
    },
    async setSaleItem({ commit, dispatch, getters }, _payload) {
        const userId = store.getters['Auth/getUser'].id
        // inicio mudar totalSale para o backend
        const totalSale = _payload.map(sale => sale.price)
            .reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue))
        // fim mudar totalSale para o backend
        const sale = { total_sale: totalSale, userId }
        await dispatch('setSale', sale)
        _payload.forEach(async item =>{
            const payload = {
                userId,
                unit_price: parseFloat(item.price),
                amount: parseFloat(item.amount),
                salesId: getters.getSale.id,
                product_id: item.id
            }
            await api.post(`${baseApiUrl}/salesItem`, payload)
            .then(() => {
                commit("SALE_ITEM", payload);
            })
            .catch(showError)
        }) 
    },
    async setMySales({ commit }, _payload) {
        await api.get(`${baseApiUrl}/user/${_payload}/sales`)
            .then(res => commit("MY_SALES", res.data))
            .catch(showError)
    },
    async setAllSales({ commit }) {
        await api.get(`${baseApiUrl}/sales`)
            .then(res => commit("ALL_SALES", res.data))
            .catch(showError)
    },
    async setSalesItemsBySaleId({ commit }, payload) {
        await api.get(`${baseApiUrl}/sale/${payload}/items`)
            .then(res => commit("SALES_ITEMS_BY_SALE_ID", res.data))
            .catch(showError)
    },
}
  