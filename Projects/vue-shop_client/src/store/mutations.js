import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO
} from './mutation-types'

export default {

    [RECEIVE_ADDRESS](state, {address}) {
        state.address = address
    },

    [RECEIVE_FOODCATEGORIES](state, {foodCategories}) {
        state.foodCategories = foodCategories
    },

    [RECEIVE_SHOPS](state, {shops}) {
        state.shops = shops
    },

    [RECEIVE_USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo
    },

    [RESET_USER_INFO](state) {
        state.userInfo = {}
    }
}