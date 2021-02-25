import api from 'axios'
import { baseApiUrl, showSuccess, showError } from '@/global'

export default {
    toggleMenu({ commit, getters }, payload) {
        if(!getters.getUser) {
            commit("TOGGLE_MENU", false);
            return
        }
        if(payload === undefined) {
            commit("TOGGLE_MENU", !getters.getIsMenuVisible);
        } else {
            commit("TOGGLE_MENU", payload);
        }
    },
    async setUser({ commit, dispatch }, payload) {
        const user = payload
        if(user) {
            api.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            commit("USER", user);
            dispatch('toggleMenu', true)
        } else {
            commit("USER", user);
            delete await api.defaults.headers.common['Authorization']
            dispatch('toggleMenu', false)
        }
    },
    async setValidateUser ({ commit }, payload) {
        await api.post(`${baseApiUrl}/validateToken`, payload)
            .then(res => commit("VALIDATE_USER", res.data))
    },
    async signin({ commit }, payload) {
        await api.post(`${baseApiUrl}/signin`, payload)
            .then(res => commit("SIGNIN", res.data) )
            .catch((err) => {
                showError(err)
                commit("SIGNIN", null) 
            })
    },
    async signup({ commit }, payload) {
        await api.post(`${baseApiUrl}/signup`, payload)
            .then(res =>{
                showSuccess('Usuário criado com sucesso.')
                commit("SIGNUP", res.data)
            })
            .catch((err) => {
                showError(err)
                commit("SIGNUP", null)
            })
    }
}
  
