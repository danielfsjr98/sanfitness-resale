export default {
    getUser(state) {
        return state.user
    },
    getIsMenuVisible(state){
        return state.isMenuVisible
    },
    getValidateUser(state){
        return state.validateUser
    },
    getSignin(state){
        return state.signin
    },
    getSignup(state){
        return state.signup
    }
}