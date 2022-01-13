import Vue from 'vue'
import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    SAVE_PLACE_ID,
    RECEIVE_GOODS,
    RECEIVE_INFOS,
    RECEIVE_RATINGS,
    FOOD_COUNT_INCREMENT,
    FOOD_COUNT_DECREMENT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
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

    [SAVE_PLACE_ID](state, {place_id}) {
        if(place_id) {
            state.place_id = place_id
        }
    },

    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },

    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },

    [RECEIVE_INFOS](state, {infos}) {
        state.infos = infos
    },

    [FOOD_COUNT_INCREMENT](state, {food}) {
        if(food.count) {            
            food.count++
        } else {
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        }
    },

    [FOOD_COUNT_DECREMENT](state, {food}) {
        if(food.count) {
            food.count--
            if(food.count===0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },

    [CLEAR_CART](state) {
        state.cartFoods.forEach(food => food.count = 0)
        state.cartFoods = []
    },

    [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
        state.searchShops = searchShops
        console.log(searchShops)
    }
}