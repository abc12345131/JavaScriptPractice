import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS
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
    }
}