export default {
    TOGGLE_MENU(state, payload) {
        state.isMenuVisible = payload
    },
    USER(state, payload) {
        state.user = payload
    },
    VALIDATE_USER(state, payload) {
        state.validateUser = payload
    },
    SIGNIN(state, payload) {
        state.signin = payload
    },
    SIGNUP(state, payload) {
        state.signup = payload
    }
}