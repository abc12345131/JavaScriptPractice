import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_PLACE_ID,
    RECEIVE_GOODS,
    RECEIVE_INFOS,
    RECEIVE_RATINGS
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
    },

    [RECEIVE_PLACE_ID](state, {place_id}) {
        state.place_id = place_id
    },

    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },

    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },

    [RECEIVE_INFOS](state, {infos}) {
        state.infos = infos
    }
}