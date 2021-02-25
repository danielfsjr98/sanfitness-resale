export default {
    ALL_USERS(state, payload) {
        state.users = payload
    },
    USER(state, payload) {
        state.user = payload
    },
    USER_BY_ID(state, payload) {
        state.userById = payload
    }
}