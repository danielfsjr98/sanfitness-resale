import api from 'axios'
import { baseApiUrl, showError, showSuccess } from '@/global'

export default {
    async setUsers({ commit }, _payload) {
        await api.get(`${baseApiUrl}/users`, _payload)
            .then(res => {
                commit("ALL_USERS", res.data);
            })
            .catch(showError)
    },
    async saveUser({ commit }, payload){
        await api.post(`${baseApiUrl}/users`, payload)
            .then(res => {
                showSuccess("Usuário criado com sucesso!")
                commit("USER", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("USER", null)
            })
    },
    async editUser({ commit }, payload){
        await api.put(`${baseApiUrl}/users/${payload.id}`, payload)
            .then(res => {
                showSuccess("Usuário editado com sucesso!")
                commit("USER", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("USER", null)
            })
    },
    async removeUser({ commit }, payload){
        await api.delete(`${baseApiUrl}/users/${payload}`)
            .then(res => {
                showSuccess("Usuário excluído com sucesso!")
                commit("USER", res.data)
            })
            .catch(msg => {
                showError(msg)
                commit("USER", null)
            })
    },
    async setUserById({ commit }, payload){
        await api.get(`${baseApiUrl}/users/${payload}`)
            .then(res => commit("USER_BY_ID", res.data))
            .catch(showError)
    }
}
  