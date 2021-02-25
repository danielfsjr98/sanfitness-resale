import api from 'axios'
import { baseApiUrl, showError, showSuccess } from '@/global'

export default {
    async setProducts({ commit }, _payload) {
        await api.get(`${baseApiUrl}/products`, _payload)
            .then(res => {
                commit("ALL_PRODUCTS", res.data);
            })
            .catch(showError)
    },
    async saveProduct({ commit }, payload){
        await api.post(`${baseApiUrl}/products`, payload)
            .then(res => {
                showSuccess("Produto cadastrado com sucesso!")
                commit("PRODUCT", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("PRODUCT", null)
            })
    },
    async editProduct({ commit }, payload){
        await api.put(`${baseApiUrl}/products/${payload.id}`, payload)
            .then(res => {
                showSuccess("Produto editado com sucesso!")
                commit("PRODUCT", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("PRODUCT", null)
            })
    },
    async removeProduct({ commit }, payload){
        await api.delete(`${baseApiUrl}/products/${payload}`)
            .then(res => {
                showSuccess("Produto excluído com sucesso!")
                commit("PRODUCT", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("PRODUCT", null)
            })
    },
    async setProductById({ commit }, payload){
        await api.get(`${baseApiUrl}/products/${payload}`)
            .then(res => commit("PRODUCT_BY_ID", res.data))
            .catch(showError)
    }
}
  