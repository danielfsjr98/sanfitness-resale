import Vue from 'vue'
import Vuex from 'vuex'
import Users from './users/index'
import Auth from './auth/index'
import Products from './products/index'
import Sales from './sales/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Users,
        Auth,
        Products,
        Sales
    }
})