import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS
} from './mutation-types'

import { reqAddress, reqFoodCategories, reqSearchShops } from '../api'

export default {

    async getAddress(context) {

        const result = await reqAddress(context.state.latitude, context.state.longitude)

        if (result.status===0) {
            const address = result.data[1]
            context.commit(RECEIVE_ADDRESS, {address})
        }
    },

    async getFoodCategories(context) {
    
        const result = await reqFoodCategories()

        if (result.code===0) {
            const foodCategories = result.data
            context.commit(RECEIVE_FOODCATEGORIES, {foodCategories})
        }
    },

    async getShops(context) {

        const { latitude, longitude } = context.state
        const result = await reqSearchShops(latitude,longitude)

        if (result.code===0) {
            const shops = result.data
            context.commit(RECEIVE_SHOPS, {shops})
        }
    }

}