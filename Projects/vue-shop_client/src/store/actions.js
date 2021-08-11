import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS
} from './mutation-types'

import { reqAddress, reqFoodCategories, reqShops } from '../api'

export default {

    async getAddress(context) {

        const latlng= context.state.latitude+ ',' + context.state.longitude
        const result = await reqAddress(latlng)

        if (result.status==='OK') {
            const address = result.results[1]
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
        const result = await reqShops(latitude,longitude)

        if (result.code===0) {
            const shops = result.data
            context.commit(RECEIVE_SHOPS, {shops})
        }
    }

}