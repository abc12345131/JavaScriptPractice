import { 
    RECEIVE_ADDRESS,
    RECEIVE_FOODCATEGORIES,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_PLACE_ID,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFOS
} from './mutation-types'

import { 
    reqAddress,
    reqFoodCategories,
    reqSearchShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopRatings,
    reqShopInfos
} from '../api'

export default {

    getLocation(context) {
        if ("geolocation" in navigator) {
            // check if geolocation is supported/enabled on current browser
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    // for when getting location is a success
                    context.state.latitude = position.coords.latitude
                    context.state.longitude = position.coords.longitude
                    console.log('Location updated!')
                },
                function error(error_message) {
                    // for when getting location results in an error
                    console.error('An error has occured while retrieving location', error_message)
                }
            )
        } else {
            // geolocation is not supported
            // get your location some other way
            console.log('Geolocation is not enabled on this browser!')
        }
    },

    async getAddress(context) {

        const result = await reqAddress(context.state.latitude, context.state.longitude)

        if (result.status===0) {
            const address = result.data.results[1]
            context.commit(RECEIVE_ADDRESS, {address})
        }
    },

    async getFoodCategories(context) {
    
        const result = await reqFoodCategories()

        if (result.status===0) {
            const foodCategories = result.data
            context.commit(RECEIVE_FOODCATEGORIES, {foodCategories})
        }
    },

    async getShops(context) {

        const { latitude, longitude } = context.state
        const result = await reqSearchShops(latitude,longitude)

        if (result.status===0) {
            const shops = result.data.results
            context.commit(RECEIVE_SHOPS, {shops})
        }
    },

    saveUserInfo(context, userInfo) {
        context.commit(RECEIVE_USER_INFO, {userInfo})
    },

    async getUserInfo(context) {
        const result = await reqUserInfo()
        if(result.status===0) {
            const userInfo = result.data
            context.commit(RECEIVE_USER_INFO, {userInfo})
        }
    },

    async logout(context) {
        const result = await reqLogout()
        if(result.status===0) {
            context.commit(RESET_USER_INFO)
        }
    },

    savePlaceId(context, place_id) {
        context.commit(RECEIVE_PLACE_ID, {place_id})
    },

    async getShopGoods(context) {
    
        const result = await reqShopGoods(context.state.place_id)

        if (result.status===0) {
            const goods = result.data
            context.commit(RECEIVE_GOODS, {goods})
        }
    },

    async getShopRatings(context) {

        const result = await reqShopRatings(context.state.place_id)

        if (result.status===0) {
            const ratings = result.data
            context.commit(RECEIVE_RATINGS, {ratings})
        }
    },

    async getShopInfos(context) {
    
        const result = await reqShopInfos(context.state.place_id)

        if (result.status===0) {
            const infos = result.data
            context.commit(RECEIVE_INFOS, {infos})
        }
    }
}